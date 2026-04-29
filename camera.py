import os
import threading
import time

import cv2
from alert_system import phone_alert, show_gui_alert, sound_alert
from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO(r"runs/detect/train4/weights/best.pt")
alarm_triggered = False


def save_frame(frame):
    if not os.path.exists("accident_photos"):
        os.makedirs("accident_photos")
    filename = f"accident_photos/accident_{time.strftime('%Y%m%d_%H%M%S')}.jpg"
    cv2.imwrite(filename, frame)
    print(f"✅ Saved: {filename}")


def alert_thread():
    show_gui_alert()
    sound_alert()
    phone_alert()


def detect_accident(frame):
    global alarm_triggered
    results = model(frame)

    for r in results:
        if r.boxes:
            class_id = int(r.boxes.cls[0])  # index of predicted class
            class_name = model.names[class_id]
            confidence = float(r.boxes.conf[0])

            if class_name.lower() == "accident" and not alarm_triggered:
                save_frame(frame)
                alarm_triggered = True
                threading.Thread(target=alert_thread).start()

            # Draw label
            cv2.putText(frame, f"{class_name} {confidence:.2f}", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    return frame


def startapplication(input_path="test_videos/test1.mp4"):
    global alarm_triggered
    alarm_triggered = False

    ext = os.path.splitext(input_path)[1].lower()

    if ext in [".jpg", ".png", ".jpeg", ".bmp"]:
        print("🖼️ Image detected.")
        frame = cv2.imread(input_path)
        frame = detect_accident(frame)
        cv2.imshow("Accident Detection - Image", frame)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    elif ext in [".mp4", ".avi", ".mov", ".mkv"]:
        print("🎥 Video detected.")
        cap = cv2.VideoCapture(input_path)
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frame = detect_accident(frame)
            cv2.imshow("Accident Detection - Video", frame)
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
        cap.release()
        cv2.destroyAllWindows()

    else:
        print("❌ Unsupported file format.")


# Example:
# To use this, call: startapplication("yourfile.jpg") or startapplication("yourfile.mp4")
