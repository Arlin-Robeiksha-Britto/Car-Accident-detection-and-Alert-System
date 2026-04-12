from __future__ import annotations

import os
import tkinter as tk
import traceback
import webbrowser
import winsound
from tkinter import messagebox

from PIL import Image, ImageSequence, ImageTk
from twilio.rest import Client

from emergency_response_system import EmergencyResponseSystem

# Initialize emergency response system
emergency_system = EmergencyResponseSystem()


def sound_alert():
    """Sound alert using system beep."""
    winsound.Beep(2500, 1000)  # Frequency: 2500 Hz, Duration: 1 sec


def call_alert():
    """Phone call alert using Twilio."""
    try:
        # Replace with your real credentials from Twilio Console
        account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        client = Client(account_sid, auth_token)

        # Call verified number using Twilio number
        call = client.calls.create(
            url="http://demo.twilio.com/docs/voice.xml",
            to="XXXXXXXXXXX",  # Verified number
            from_="XXXXXXXXX",  # Your Twilio number
        )

        print("✅ Call initiated. SID:", call.sid)
        return True

    except Exception as e:
        print("❌ Call alert error:", e)
        traceback.print_exc()
        return False


def show_enhanced_gui_alert(
    accident_lat: float | None = None,
    accident_lon: float | None = None,
    accident_location_name: str = "Unknown Location",
):
    """Enhanced GUI alert with route finding and hospital information.

    Args:
        accident_lat, accident_lon: Accident location coordinates
        accident_location_name: Descriptive name of accident location
    """

    def animate(counter):
        frame = frames[counter]
        counter = (counter + 1) % frame_count
        label.configure(image=frame)
        root.after(100, animate, counter)

    def on_make_call():
        """Handle emergency call button."""
        if call_alert():
            messagebox.showinfo("Call Initiated", "Emergency call has been initiated!")
        root.destroy()

    def on_view_route():
        """Handle view route button - generates map and opens it."""
        if accident_lat is None or accident_lon is None:
            messagebox.showerror("Error", "Accident location coordinates not available!")
            return

        try:
            # Generate route and map (use fast_mode for instant results)
            response = emergency_system.handle_accident(
                accident_lat=accident_lat,
                accident_lon=accident_lon,
                generate_map=True,
                fast_mode=True,  # Fast mode for GUI responsiveness
            )

            if response.get("success"):
                map_file = response.get("map_file")
                if map_file and os.path.exists(map_file):
                    # Open map in browser
                    webbrowser.open(f"file:///{os.path.abspath(map_file)}")
                    messagebox.showinfo(
                        "Route Generated",
                        f"Route map generated!\n\n"
                        f"Hospital: {response['selected_hospital']['name']}\n"
                        f"Distance: {response['route']['distance_km']:.2f} km\n"
                        f"Rating: {response['selected_hospital']['star_rating']:.1f}/5.0 stars\n\n"
                        f"Map opened in browser.",
                    )
                else:
                    messagebox.showerror("Error", "Could not generate route map!")
            else:
                messagebox.showerror("Error", f"Route finding failed: {response.get('error', 'Unknown error')}")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to generate route: {e!s}")
            traceback.print_exc()

    sound_alert()

    root = tk.Tk()
    root.title("🚨 Accident Detected!")
    root.geometry("600x600")
    root.resizable(False, False)

    # Main label
    tk.Label(root, text="🚨 ACCIDENT DETECTED! 🚨", font=("Arial", 18, "bold"), fg="red").pack(pady=10)

    tk.Label(root, text=f"Location: {accident_location_name}", font=("Arial", 12)).pack(pady=5)

    if accident_lat and accident_lon:
        tk.Label(
            root, text=f"Coordinates: ({accident_lat:.6f}, {accident_lon:.6f})", font=("Arial", 10), fg="gray"
        ).pack(pady=2)

    # Load animated GIF
    try:
        gif_path = "assetes/alert.gif"  # Note: original typo preserved
        if not os.path.exists(gif_path):
            gif_path = "assets/alert.gif"  # Try alternative path

        if os.path.exists(gif_path):
            gif = Image.open(gif_path)
            frames = [ImageTk.PhotoImage(frame.copy().convert("RGBA")) for frame in ImageSequence.Iterator(gif)]
            frame_count = len(frames)

            label = tk.Label(root)
            label.pack(pady=10)
            animate(0)  # Start animation
        else:
            tk.Label(root, text="⚠️ Alert animation", fg="orange", font=("Arial", 14)).pack(pady=20)
    except Exception as e:
        print("GIF error:", e)
        tk.Label(root, text="⚠️ Alert GIF not found", fg="red").pack(pady=20)

    # Information section
    info_frame = tk.Frame(root)
    info_frame.pack(pady=10, padx=20, fill=tk.BOTH, expand=True)

    if accident_lat and accident_lon:
        tk.Label(info_frame, text="Emergency Response Options:", font=("Arial", 12, "bold")).pack(pady=5)

        tk.Label(
            info_frame,
            text="• Route finding system will select best hospital\n"
            "• Hospital rating considered for selection\n"
            "• Optimal route will be calculated automatically",
            font=("Arial", 10),
            justify=tk.LEFT,
        ).pack(pady=5)

    # Buttons
    button_frame = tk.Frame(root)
    button_frame.pack(pady=20)

    if accident_lat and accident_lon:
        tk.Button(
            button_frame,
            text="🗺️ View Route Map",
            command=on_view_route,
            bg="#2196f3",
            fg="white",
            font=("Arial", 12, "bold"),
            padx=20,
            pady=10,
        ).pack(side=tk.LEFT, padx=10)

    tk.Button(
        button_frame,
        text="📞 Make Emergency Call",
        command=on_make_call,
        bg="red",
        fg="white",
        font=("Arial", 12, "bold"),
        padx=20,
        pady=10,
    ).pack(side=tk.LEFT, padx=10)

    tk.Button(
        button_frame, text="Close", command=root.destroy, bg="gray", fg="white", font=("Arial", 10), padx=15, pady=5
    ).pack(side=tk.LEFT, padx=10)

    root.mainloop()


def show_gui_alert(
    message="⚠️ Accident Detected!", accident_lat: float | None = None, accident_lon: float | None = None
):
    """Backward-compatible wrapper for existing alert system Falls back to enhanced alert if coordinates provided.
    """
    if accident_lat is not None and accident_lon is not None:
        show_enhanced_gui_alert(accident_lat, accident_lon, "Accident Location")
    else:
        # Simple alert without route finding
        sound_alert()
        root = tk.Tk()
        root.title("Accident Alert")
        label = tk.Label(root, text=message, font=("Arial", 16), fg="red")
        label.pack(padx=20, pady=20)
        root.after(3000, root.destroy)  # Auto close after 3 sec
        root.mainloop()


# Run the alert GUI
if __name__ == "__main__":
    # Test with sample coordinates (Chennai, India)
    show_enhanced_gui_alert(accident_lat=13.074, accident_lon=80.24, accident_location_name="Chennai - Test Location")
