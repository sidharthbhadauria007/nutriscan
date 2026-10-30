import sys
import json
import os

os.environ["YOLO_VERBOSE"] = "False"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'best.pt')

def detect_food(image_path):
    try:
        from ultralytics import YOLO
        model = YOLO(MODEL_PATH)
        
        # imgsz=320 speed fast karega, conf=0.25 accurate detection hi lega
        results = model.predict(source=image_path, conf=0.25, imgsz=320, verbose=False)
        
        detections = []
        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                label = model.names[cls_id]
                confidence = float(box.conf[0])
                
                detections.append({
                    "item": str(label),
                    "confidence": round(confidence * 100, 2)
                })
                
        return detections
    except Exception as e:
        return []

if __name__ == "__main__":
    if len(sys.argv) > 1:
        img_path = sys.argv[1]
        res = detect_food(img_path)
    else:
        res = []
    
    print("JSON_START" + json.dumps(res) + "JSON_END")