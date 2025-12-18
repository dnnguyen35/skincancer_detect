from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import time
import os, shutil, uuid
import cv2
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="2-Stage YOLO Skin Cancer Detection")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models
model_stage1 = YOLO("./model/best.pt")
model_stage2 = YOLO("./model/best-1.pt")

UPLOAD_DIR = "temp"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def parse_classification_results(results):
    top_result = {}
    
    for r in results:
        top1_idx = r.probs.top1
        top1_conf = r.probs.top1conf.item()
        class_name = r.names[top1_idx]
        top_result = {
            "class_id": int(top1_idx),
            "class_name": class_name,
            "confidence": round(float(top1_conf), 4)
        }
    return top_result

@app.post("/detect")
async def detect_image(file: UploadFile = File(...)):
    start_time = time.time()
    filename = f"{uuid.uuid4()}.jpg"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    img = cv2.imread(file_path)
    h, w = img.shape[:2]
    results1 = model_stage1(file_path)
    stage1_result = parse_classification_results(results1)
    is_risk = False
    if stage1_result.get("class_name") == "risk":
        is_risk = True
    if not is_risk:
        os.remove(file_path)

        return {
            "stage": 1,
            "has_disease": False,
            "message": "There is no skin disease detected.",
            "stage1_result": stage1_result,
            "time_ms": round((time.time() - start_time) * 1000, 2)
        }
    results2 = model_stage2(file_path, conf=0.1)
    stage2_result = parse_classification_results(results2)

    os.remove(file_path)

    return {
        "stage": 2,
        "has_disease": True,
        "message": f"There is skin disease detected: {stage2_result['class_name']}",
        "stage1_result": stage1_result,
        "stage2_result": stage2_result,
        "time_ms": round((time.time() - start_time) * 1000, 2)
    }