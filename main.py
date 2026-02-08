import os

import cv2
from alert_system import show_gui_alert, sound_alert
from ultralytics import YOLO

# Load model
model = YOLO(r"runs/detect/train4/weights/best.pt")

# Provide your single video file path
video_path = r"c:/Road-Accident-Detection-Alert-System-main/yolov5/test_video.mp4"

cap = cv2.VideoCapture(video_path)

frame_count = 0
alert_triggered = False

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)[0]

    for r in results.boxes.data.tolist():
        class_id = int(r[5])
        class_name = model.names[class_id]

        if class_name.lower() == "accident" and not alert_triggered:
            alert_triggered = True
            print("🚨 Accident detected in video!")

            # Save frame
            os.makedirs("accident_photos", exist_ok=True)
            img_path = "accident_photos/accident_frame.jpg"
            cv2.imwrite(img_path, frame)

            # Trigger alerts
            sound_alert()
            show_gui_alert()

    frame_count += 1
    cv2.imshow("Detection", frame)

    if cv2.waitKey(1) == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
