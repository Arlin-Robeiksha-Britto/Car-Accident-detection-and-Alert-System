"""
Road Accident Detection & Alert System - Full Implementation
Simple UI/UX | YOLO Accident Detection | Latest Algorithm (Bidirectional Dijkstra)
Automated Call on Detection | Google Map Pathway | Leaflet Map Pathway.

Run: python run_accident_system.py
"""

import os
import sys
import threading
import tkinter as tk
import webbrowser
from datetime import datetime
from pathlib import Path
from tkinter import filedialog, messagebox, scrolledtext, ttk

import cv2

# Add project root to path
ROOT = Path(__file__).resolve().parents[0]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

# Model path (trained accident detection)
MODEL_PATH = ROOT / "runs" / "detect" / "train4" / "weights" / "best.pt"
if not MODEL_PATH.exists():
    # Try common YOLOv5/Ultralytics training output locations
    candidates = []
    candidates += list((ROOT / "runs").glob("detect/**/weights/best.pt"))
    candidates += list((ROOT / "runs").glob("train/**/weights/best.pt"))
    candidates += list((ROOT / "runs").glob("**/weights/best.pt"))
    # Pick most recently modified candidate if any
    candidates = [p for p in candidates if p.exists()]
    if candidates:
        candidates.sort(key=lambda p: p.stat().st_mtime, reverse=True)
        MODEL_PATH = candidates[0]
    else:
        # Fallback (will NOT detect accidents unless you have a custom model)
        MODEL_PATH = ROOT / "yolov5s.pt"

# Default accident location (Chennai) - replace with GPS in production
DEFAULT_ACCIDENT_LAT = 13.074000
DEFAULT_ACCIDENT_LON = 80.240000


def log_message(text_widget, msg):
    """Thread-safe log to text widget."""
    try:
        text_widget.insert(tk.END, msg + "\n")
        text_widget.see(tk.END)
    except Exception:
        print(msg)


def run_detection_loop(app):
    """Background thread: video capture + YOLO detection."""
    source = app.video_source_var.get().strip()
    if not source:
        source = 0
    try:
        source = int(source)
    except ValueError:
        pass  # path string

    # Make file paths more robust on Windows
    if isinstance(source, str):
        source = os.path.normpath(source)
    cap = cv2.VideoCapture(source)
    if not cap.isOpened():
        app.after(0, lambda: log_message(app.log_text, "[ERROR] Could not open video source."))
        app.after(0, lambda: app.set_status("Stopped"))
        return

    app.after(0, lambda: log_message(app.log_text, "[OK] Video opened. Starting detection..."))

    # Load YOLO once
    try:
        from ultralytics import YOLO

        model = YOLO(str(MODEL_PATH))
    except Exception:
        app.after(0, lambda: log_message(app.log_text, f"[ERROR] Model load failed: {e}"))
        app.after(0, lambda: app.set_status("Stopped"))
        cap.release()
        return

    # Disable live stream server (user requested no localhost dashboard)
    def _noop(*a, **k):
        pass

    set_latest_frame = set_current_alert = get_current_alert = _noop

    app.after(0, lambda: log_message(app.log_text, f"[OK] Using model: {MODEL_PATH}"))
    try:
        app.after(0, lambda: log_message(app.log_text, f"[OK] Model classes: {list(model.names.values())}"))
    except Exception:
        pass

    alert_triggered = False
    # Multi-frame confirmation (reduces false negatives/positives on videos)
    hit_score = 0
    confirm_hits = max(1, int(float(app.confirm_hits_var.get() or 3)))
    conf_th = float(app.conf_th_var.get() or 0.35)
    show_video = (
        bool(getattr(app, "show_video_var", None).get()) if getattr(app, "show_video_var", None) is not None else True
    )

    while app.detection_running and cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Feed live frame to dashboard/hospital stream
        try:
            _, jpg = cv2.imencode(".jpg", frame)
            set_latest_frame(jpg.tobytes())
        except Exception:
            pass

        # Run detection every frame (can be changed to every N frames for speed)
        results = model(frame, conf=conf_th, verbose=False)[0]

        # Live video preview (plays your accident video in real-time)
        if show_video:
            try:
                annotated = results.plot()  # draws boxes + labels like "Accident 0.xx"
                cv2.imshow("Live Accident Video (press Q to stop)", annotated)
                if (cv2.waitKey(1) & 0xFF) in (ord("q"), ord("Q")):
                    app.detection_running = False
                    break
            except Exception:
                # If imshow fails (rare), continue without preview
                pass

        accident_seen = False
        best_conf = 0.0
        for r in results.boxes.data.tolist() if getattr(results, "boxes", None) is not None else []:
            if len(r) < 6:
                continue
            conf = float(r[4])
            class_id = int(r[5])
            class_name = str(model.names.get(class_id, "")).strip()
            if class_name.lower() == "accident":
                accident_seen = True
                best_conf = max(best_conf, conf)

        # Update multi-frame hit score
        if accident_seen:
            hit_score = min(confirm_hits + 2, hit_score + 1)
        else:
            hit_score = max(0, hit_score - 1)

        # Helpful runtime signal in log (kept lightweight)
        if app.debug_log_var.get():
            app.after(
                0,
                lambda c=best_conf, hs=hit_score: log_message(
                    app.log_text, f"[DBG] accident_conf={c:.2f} hit_score={hs}/{confirm_hits}"
                ),
            )

        if (hit_score >= confirm_hits) and not alert_triggered:
            alert_triggered = True
            app.after(0, lambda: log_message(app.log_text, "[ALERT] Accident confirmed! Triggering response..."))

            # Save frame
            os.makedirs(ROOT / "accident_photos", exist_ok=True)
            ts = datetime.now().strftime("%Y%m%d_%H%M%S")
            img_path = ROOT / "accident_photos" / f"accident_{ts}.jpg"
            cv2.imwrite(str(img_path), frame)

            # Coordinates (use default; in production use GPS)
            lat, lon = DEFAULT_ACCIDENT_LAT, DEFAULT_ACCIDENT_LON

            # 1) Emergency response: 24x7 T.Nagar hospitals + police; best hospital by ICU, proximity, rating
            try:
                from emergency_response_system import EmergencyResponseSystem

                emergency_system = getattr(app, "emergency_system", None)
                if emergency_system is None:
                    emergency_system = EmergencyResponseSystem(use_t_nagar_24x7=True)
                    app.emergency_system = emergency_system

                response = emergency_system.handle_accident(
                    lat, lon, accident_id=f"accident_{ts}", generate_map=True, fast_mode=True
                )
                leaflet_map_path = response.get("map_file")
            except Exception:
                response = None
                leaflet_map_path = None
                app.after(0, lambda: log_message(app.log_text, f"[WARN] Emergency response error: {e}"))

            # 2) Alarm buzz immediately after accident confirmation (notify responders and nearby users)
            try:
                from alert_system import alarm_buzz, call_emergency_contacts

                app.after(0, lambda: log_message(app.log_text, "[OK] Alarm buzz..."))
                alarm_buzz()
            except Exception:
                try:
                    from alert_system import sound_alert

                    sound_alert()
                except Exception:
                    pass
                app.after(0, lambda: log_message(app.log_text, f"[WARN] Alarm error: {e}"))

            # 3) Automated emergency call to nearby 24x7 hospital and police
            try:
                from alert_system import call_emergency_contacts

                contacts = emergency_system.get_emergency_call_contacts(lat, lon) if response else []
                app.after(0, lambda: log_message(app.log_text, "[OK] Initiating automated call to 24x7 / police..."))
                call_emergency_contacts(contacts)
            except Exception:
                app.after(0, lambda: log_message(app.log_text, f"[WARN] Call error: {e}"))

                # 4) Update dashboard/hospital view with current alert
                try:
                    sel = (response or {}).get("selected_hospital", {})
                    set_current_alert(
                        {
                            "accident_id": f"accident_{ts}",
                            "hospital": sel.get("name", ""),
                            "map_leaflet": "file:///" + os.path.abspath(leaflet_map_path).replace("\\", "/")
                            if leaflet_map_path and os.path.exists(leaflet_map_path)
                            else "",
                            "map_google": "",
                            "timestamp": datetime.now().isoformat(),
                        }
                    )
                except Exception:
                    pass

            # 5) Google Map pathway (if we have route data)
            google_map_path = None
            if response and response.get("success"):
                try:
                    from google_emergency_map_generator import GoogleEmergencyMapGenerator

                    gen = GoogleEmergencyMapGenerator()
                    route_coords = response.get("route", {}).get("route_coordinates", [])
                    sel = response.get("selected_hospital", {})
                    gpath = ROOT / "emergency_maps" / f"google_route_{ts}.html"
                    gen.generate_map_html(
                        accident_lat=lat,
                        accident_lon=lon,
                        hospital_name=sel.get("name", "Hospital"),
                        hospital_lat=sel.get("latitude"),
                        hospital_lon=sel.get("longitude"),
                        route_coordinates=route_coords,
                        route_distance_km=response.get("route", {}).get("distance_km", 0),
                        star_rating=sel.get("star_rating", 2.5),
                        output_file=str(gpath),
                    )
                    google_map_path = str(gpath)
                    try:
                        a = get_current_alert()
                        if a:
                            a["map_google"] = "file:///" + os.path.abspath(gpath).replace("\\", "/")
                            set_current_alert(a)
                    except Exception:
                        pass
                except Exception:
                    app.after(0, lambda: log_message(app.log_text, f"[WARN] Google map error: {e}"))

            # 6) Open maps in browser (live navigation routes – Leaflet & Google)
            def open_maps():
                # Leaflet local file
                if leaflet_map_path and os.path.exists(leaflet_map_path):
                    webbrowser.open("file:///" + os.path.abspath(leaflet_map_path).replace("\\", "/"))
                    log_message(app.log_text, "[OK] Leaflet map opened in browser.")
                # Google map local file
                if google_map_path and os.path.exists(google_map_path):
                    webbrowser.open("file:///" + os.path.abspath(google_map_path).replace("\\", "/"))
                    log_message(app.log_text, "[OK] Google map opened in browser.")
                # Also open live Google Maps at accident coordinates
                gm_url = f"https://www.google.com/maps/search/?api=1&query={lat},{lon}"
                webbrowser.open(gm_url)
                log_message(app.log_text, "[OK] Google Maps live location opened.")

            app.after(0, open_maps)

            # 7) On-screen emergency response window (like your screenshot)
            def show_emergency_window():
                win = tk.Toplevel(app)
                win.title("Emergency Response System")
                win.geometry("900x650")
                win.resizable(True, True)

                header = tk.Frame(win, bg="#ff4d4d")
                header.pack(fill=tk.X)
                tk.Label(
                    header,
                    text="ACCIDENT DETECTED - EMERGENCY RESPONSE",
                    fg="white",
                    bg="#ff4d4d",
                    font=("Segoe UI", 18, "bold"),
                    padx=10,
                    pady=12,
                ).pack(anchor="center")

                # Location
                loc = ttk.LabelFrame(win, text="Accident Location", padding=(10, 8))
                loc.pack(fill=tk.X, padx=12, pady=(12, 6))
                ttk.Label(
                    loc, text=f"Latitude: {lat:.6f}  |  Longitude: {lon:.6f}", font=("Segoe UI", 10, "bold")
                ).pack(anchor=tk.CENTER)

                # Services/details text
                details = ttk.LabelFrame(win, text="Emergency Services", padding=(10, 8))
                details.pack(fill=tk.BOTH, expand=True, padx=12, pady=6)
                txt = scrolledtext.ScrolledText(details, font=("Consolas", 10), wrap=tk.WORD)
                txt.pack(fill=tk.BOTH, expand=True)

                # Build report text
                lines = []
                lines.append("=" * 78)
                lines.append("NEAREST EMERGENCY SERVICES (Sorted by Priority & Distance)")
                lines.append("=" * 78)
                lines.append("")

                # Selected hospital summary
                sel = (response or {}).get("selected_hospital", {})
                if sel:
                    lines.append("0. [HOSPITAL] Assigned Hospital")
                    lines.append(f"   Name: {sel.get('name', '')}")
                    if sel.get("phone"):
                        lines.append(f"   Phone: {sel.get('phone')}")
                    lines.append(
                        f"   Distance (route): {((response or {}).get('route', {}) or {}).get('distance_km', 0):.2f} km"
                    )
                    lines.append("")

                # Police / call contacts (from T.Nagar dataset)
                try:
                    contacts = emergency_system.get_emergency_call_contacts(lat, lon) if emergency_system else []
                except Exception:
                    contacts = []

                # Print contacts (police typically)
                idx = 1
                for c in contacts:
                    if not isinstance(c, dict):
                        continue
                    cat = str(c.get("category", "")).strip().lower()
                    name = c.get("name", "")
                    phone = c.get("phone", "")
                    dist = c.get("distance_km", None)
                    lines.append(f"{idx}. [{'POLICE' if 'police' in cat else 'SERVICE'}] {name}")
                    if dist is not None:
                        lines.append(f"   Distance: {float(dist):.2f} km")
                    if phone:
                        lines.append(f"   Phone: {phone}")
                    lines.append("")
                    idx += 1

                # Fallback if no contacts
                if idx == 1:
                    lines.append("1. (No police/service contacts found in dataset.)")
                    lines.append("")

                txt.insert(tk.END, "\n".join(lines))
                txt.configure(state=tk.NORMAL)

                # Buttons row
                btns = tk.Frame(win)
                btns.pack(fill=tk.X, padx=12, pady=(10, 12))

                def copy_details():
                    win.clipboard_clear()
                    win.clipboard_append("\n".join(lines))
                    win.update()

                def view_leaflet():
                    if leaflet_map_path and os.path.exists(leaflet_map_path):
                        webbrowser.open("file:///" + os.path.abspath(leaflet_map_path).replace("\\", "/"))

                def view_google():
                    if google_map_path and os.path.exists(google_map_path):
                        webbrowser.open("file:///" + os.path.abspath(google_map_path).replace("\\", "/"))

                def save_report():
                    os.makedirs(ROOT / "reports", exist_ok=True)
                    report_path = ROOT / "reports" / f"emergency_report_accident_{ts}.txt"
                    with open(report_path, "w", encoding="utf-8") as f:
                        f.write("\n".join(lines))
                        f.write("\n\nJSON report (auto): ")
                        f.write(
                            os.path.abspath(os.path.join(ROOT, "api_data", f"emergency_response_accident_{ts}.json"))
                        )
                    messagebox.showinfo("Saved", f"Report saved:\n{report_path}")

                tk.Button(
                    btns, text="Copy Details", bg="#4CAF50", fg="white", padx=12, pady=8, command=copy_details
                ).pack(side=tk.LEFT, padx=6)
                tk.Button(btns, text="View Map", bg="#2196F3", fg="white", padx=12, pady=8, command=view_leaflet).pack(
                    side=tk.LEFT, padx=6
                )
                tk.Button(
                    btns, text="Google Maps", bg="#4CAF50", fg="white", padx=12, pady=8, command=view_google
                ).pack(side=tk.LEFT, padx=6)
                tk.Button(
                    btns, text="Save Report", bg="#FF9800", fg="white", padx=12, pady=8, command=save_report
                ).pack(side=tk.LEFT, padx=6)
                tk.Button(btns, text="Close", bg="#f44336", fg="white", padx=12, pady=8, command=win.destroy).pack(
                    side=tk.RIGHT, padx=6
                )

            app.after(0, show_emergency_window)

            app.after(0, lambda: app.set_status("Accident detected - maps opened"))
            break  # one alert per run; remove if you want multiple

    cap.release()
    try:
        cv2.destroyWindow("Live Accident Video (press Q to stop)")
    except Exception:
        pass
    app.after(0, lambda: app.set_status("Stopped"))


class AccidentDetectionApp(tk.Tk):
    """Simple UI for Accident Detection System."""

    def __init__(self):
        super().__init__()
        self.title("Road Accident Detection & Alert System")
        self.geometry("700x520")
        self.resizable(True, True)
        self.detection_running = False
        self.emergency_system = None

        self._build_ui()

    def _build_ui(self):
        # Header
        header = ttk.Frame(self, padding=(15, 10))
        header.pack(fill=tk.X)
        ttk.Label(header, text="Road Accident Detection & Alert System", font=("Segoe UI", 14, "bold")).pack(
            anchor=tk.W
        )
        ttk.Label(
            header,
            text="YOLO detection | Bidirectional Dijkstra routing | Auto-call | Leaflet & Google Maps",
            font=("Segoe UI", 9),
            foreground="gray",
        ).pack(anchor=tk.W)

        # Video source
        src_frame = ttk.LabelFrame(self, text="Video source", padding=(10, 8))
        src_frame.pack(fill=tk.X, padx=15, pady=8)
        default_video = str(ROOT / "test_video.mp4")
        self.video_source_var = tk.StringVar(value=default_video if os.path.exists(default_video) else "0")
        ttk.Label(src_frame, text="Video file path (auto uses test_video.mp4 if present):").pack(anchor=tk.W)
        row = ttk.Frame(src_frame)
        row.pack(fill=tk.X, pady=4)
        ttk.Entry(row, textvariable=self.video_source_var, width=50).pack(
            side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 8)
        )
        ttk.Button(row, text="Browse...", command=self._browse_video).pack(side=tk.RIGHT)

        # Detection tuning (helps video files trigger reliably)
        tune = ttk.LabelFrame(self, text="Detection tuning", padding=(10, 8))
        tune.pack(fill=tk.X, padx=15, pady=(0, 8))
        trow = ttk.Frame(tune)
        trow.pack(fill=tk.X)
        self.conf_th_var = tk.StringVar(value="0.35")
        self.confirm_hits_var = tk.StringVar(value="3")
        self.debug_log_var = tk.BooleanVar(value=False)
        self.show_video_var = tk.BooleanVar(value=True)
        ttk.Label(trow, text="Confidence:").pack(side=tk.LEFT)
        ttk.Entry(trow, textvariable=self.conf_th_var, width=6).pack(side=tk.LEFT, padx=(6, 16))
        ttk.Label(trow, text="Confirm frames:").pack(side=tk.LEFT)
        ttk.Entry(trow, textvariable=self.confirm_hits_var, width=6).pack(side=tk.LEFT, padx=(6, 16))
        ttk.Checkbutton(trow, text="Debug log", variable=self.debug_log_var).pack(side=tk.LEFT)
        ttk.Checkbutton(trow, text="Show live video", variable=self.show_video_var).pack(side=tk.LEFT, padx=(12, 0))

        # Controls
        ctrl = ttk.Frame(self, padding=(15, 5))
        ctrl.pack(fill=tk.X)
        self.btn_start = ttk.Button(ctrl, text="Start detection", command=self._start)
        self.btn_start.pack(side=tk.LEFT, padx=(0, 8))
        self.btn_stop = ttk.Button(ctrl, text="Stop", command=self._stop, state=tk.DISABLED)
        self.btn_stop.pack(side=tk.LEFT)
        self.status_var = tk.StringVar(value="Ready")
        ttk.Label(ctrl, textvariable=self.status_var, font=("Segoe UI", 9)).pack(side=tk.LEFT, padx=(20, 0))

        # Log
        log_frame = ttk.LabelFrame(self, text="Log", padding=(8, 6))
        log_frame.pack(fill=tk.BOTH, expand=True, padx=15, pady=8)
        self.log_text = scrolledtext.ScrolledText(log_frame, height=14, font=("Consolas", 9), wrap=tk.WORD)
        self.log_text.pack(fill=tk.BOTH, expand=True)

        # Footer
        foot = ttk.Frame(self, padding=(15, 5))
        foot.pack(fill=tk.X)
        ttk.Label(
            foot,
            text="24x7 T.Nagar hospitals + police | Alarm buzz | Auto-call | Leaflet & Google maps | Dashboard: http://127.0.0.1:5000/",
            font=("Segoe UI", 8),
            foreground="gray",
        ).pack(anchor=tk.W)

    def _browse_video(self):
        path = filedialog.askopenfilename(
            title="Select video file", filetypes=[("Video", "*.mp4 *.avi *.mov *.mkv"), ("All", "*.*")]
        )
        if path:
            self.video_source_var.set(path)

    def set_status(self, msg):
        self.status_var.set(msg)

    def _start(self):
        self.detection_running = True
        self.btn_start.config(state=tk.DISABLED)
        self.btn_stop.config(state=tk.NORMAL)
        self.set_status("Running...")
        threading.Thread(target=run_detection_loop, args=(self,), daemon=True).start()

    def _stop(self):
        self.detection_running = False
        self.btn_start.config(state=tk.NORMAL)
        self.btn_stop.config(state=tk.DISABLED)
        self.set_status("Stopped")


def main():
    app = AccidentDetectionApp()
    app.mainloop()


if __name__ == "__main__":
    main()
