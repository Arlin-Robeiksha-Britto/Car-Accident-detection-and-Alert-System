from ultralytics import YOLO


class AccidentDetectionModel:
    class_names = ["Accident", "No Accident"]  # You can customize this if your class indices differ

    def __init__(self, model_path):
        self.model = YOLO(model_path)

    def predict_accident(self, frame):
        """Takes an image (BGR NumPy array like from OpenCV) and predicts accident. Returns: (label, confidence).
        """
        results = self.model(frame)
        boxes = results[0].boxes
        scores = boxes.conf.cpu().numpy() if boxes else []
        classes = boxes.cls.cpu().numpy() if boxes else []

        # Default: No accident
        prediction = "No Accident"
        confidence = 0.0

        for cls, score in zip(classes, scores):
            if int(cls) == 0:  # class ID 0 = Accident (ensure this is correct)
                prediction = "Accident"
                confidence = float(score)
                break

        return prediction, confidence
