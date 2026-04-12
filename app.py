import tempfile

import cv2
import streamlit as st
from PIL import Image
from ultralytics import YOLO

# Load your custom YOLOv5s model
model = YOLO("yolov5s.pt")  # or 'best.pt' if available

st.title("🧠 Tuck Detection with YOLOv5s")
st.write("Upload an image or video to detect `tuck_in` and `tuck_out` using your trained model.")

# Sidebar file uploader
file = st.file_uploader("Upload image or video", type=["jpg", "png", "mp4"])

if file:
    suffix = file.name.split(".")[-1]

    if suffix in ["jpg", "png"]:
        image = Image.open(file).convert("RGB")
        st.image(image, caption="Uploaded Image", use_column_width=True)

        # Inference
        results = model.predict(image)
        res_plotted = results[0].plot()
        st.image(res_plotted, caption="Detection Result", use_column_width=True)

    elif suffix == "mp4":
        tfile = tempfile.NamedTemporaryFile(delete=False)
        tfile.write(file.read())

        cap = cv2.VideoCapture(tfile.name)
        stframe = st.empty()

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            results = model.predict(frame)
            annotated_frame = results[0].plot()

            stframe.image(annotated_frame, channels="BGR", use_column_width=True)
        cap.release()
