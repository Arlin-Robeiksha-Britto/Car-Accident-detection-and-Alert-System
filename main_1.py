import os
import threading

import cv2
import requests
from playsound import playsound
from twilio.rest import Client
from ultralytics import YOLO  # Import YOLO

# ================= CONFIGURATION =================
# 1. API & Twilio
SERVER_URL = "http://localhost:5000/api/trigger"
TWILIO_SID = os.getenv("TWILIO_ACCOUNT_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH_TOKEN")
FROM_PHONE = ""
TO_PHONE = ""  # Your verified number in E.164 format (e.g., +1234567890)

# 2. Location (T. Nagar Simulation)
CURRENT_LAT = 13.0390
CURRENT_LNG = 80.2360

# 3. Model Settings
MODEL_PATH = "model/best.pt"  # Path to your trained weights
VIDEO_SOURCE = "accident_clip.mp4"  # Or 0 for Webcam
CONFIDENCE_THRESHOLD = 0.6  # 60% confidence required to trigger
TARGET_CLASS_ID = 0  # Change this if 'Accident' is not the first class


# ================= TRIGGER LOGIC =================
def play_sound_thread():
    try:
        playsound("./sounds/alarm.mp3")
    except:
        pass


def send_alert_thread():
    print("🚨 SENDING ALERTS...")
    # Call Twilio
    try:
        client = Client(TWILIO_SID, TWILIO_AUTH)
        client.calls.create(
            twiml="<Response><Say>Critical Alert. Accident detected via CCTV. Dispatching unit.</Say></Response>",
            to=TO_PHONE,
            from_=FROM_PHONE,
        )
        print("✅ Call Initiated")
    except Exception as e:
        print(f"❌ Twilio Error: {e}")

    # Update Dashboard
    try:
        data = {"lat": CURRENT_LAT, "lng": CURRENT_LNG}
        requests.post(SERVER_URL, json=data)
        print("✅ Dashboard Updated")
    except Exception as e:
        print(f"❌ Server Error: {e}")


# ================= MAIN AI LOOP =================
def start_detection():
    # Load your custom trained model
    print(f"🔄 Loading Model: {MODEL_PATH}...")
    model = YOLO(MODEL_PATH)

    cap = cv2.VideoCapture(VIDEO_SOURCE)

    # Flag to prevent spamming calls (Trigger only once per event)
    accident_reported = False

    print("🎥 AI SURVEILLANCE ACTIVE")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 1. Run YOLO Inference
        results = model(frame, verbose=False)  # verbose=False keeps terminal clean

        detected_in_frame = False

        # 2. Analyze Results
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Get Class ID and Confidence
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])

                # Check if it matches our criteria
                if cls_id == TARGET_CLASS_ID and conf > CONFIDENCE_THRESHOLD:
                    detected_in_frame = True

                    # Draw Bounding Box (Visual Feedback)
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 3)
                    cv2.putText(
                        frame,
                        f"ACCIDENT {int(conf * 100)}%",
                        (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.9,
                        (0, 0, 255),
                        2,
                    )

        # 3. Trigger Logic
        if detected_in_frame:
            if not accident_reported:
                accident_reported = True  # Lock it so we don't call 100 times
                print("⚠️ ACCIDENT DETECTED - EXECUTING PROTOCOL")

                # Run alerts in background threads so video doesn't freeze
                threading.Thread(target=play_sound_thread).start()
                threading.Thread(target=send_alert_thread).start()

        # Display the Feed
        cv2.imshow("YOLO Accident Detection", frame)

        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    start_detection()
