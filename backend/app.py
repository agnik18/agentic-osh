from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, ImageDraw
import io
import base64
from datetime import datetime
from ultralytics import YOLO
import hashlib
import json

app = Flask(__name__)
CORS(app)

# Load YOLO model
model = YOLO("models/best.pt")

# ---------------- AGENT MEMORY ----------------
reports = []
consecutive_violations = 0
# ---------------------------------------------

def generate_hash(report_data):
    """
    Generate SHA-256 hash for report integrity
    """
    report_string = json.dumps(report_data, sort_keys=True).encode()
    return hashlib.sha256(report_string).hexdigest()

@app.route("/upload", methods=["POST"])
def upload():
    global consecutive_violations

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    img = Image.open(file.stream).convert("RGB")

    results = model.predict(img, verbose=False)[0]
    draw = ImageDraw.Draw(img)

    helmets = []
    people = []

    for box, cls in zip(results.boxes.xyxy, results.boxes.cls):
        x0, y0, x1, y1 = map(int, box)
        cls_id = int(cls)
        label = model.names[cls_id].lower()

        if label == "helmet":
            helmets.append((x0, y0, x1, y1))
        elif label in ["person", "head", "no_helmet"]:
            people.append((x0, y0, x1, y1))

    violations = 0
    compliant_people = 0

    for (x0, y0, x1, y1) in people:
        person_center = ((x0 + x1) / 2, (y0 + y1) / 2)
        compliant = False

        for (hx0, hy0, hx1, hy1) in helmets:
            helmet_center = ((hx0 + hx1) / 2, (hy0 + hy1) / 2)
            if abs(helmet_center[0] - person_center[0]) < 80 and abs(helmet_center[1] - person_center[1]) < 100:
                compliant = True
                break

        color = "green" if compliant else "red"
        draw.rectangle([x0, y0, x1, y1], outline=color, width=3)
        draw.text((x0, y0 - 10), "Compliant" if compliant else "No Helmet", fill=color)

        if compliant:
            compliant_people += 1
        else:
            violations += 1

    # ---------------- MEMORY UPDATE ----------------
    if violations > 0:
        consecutive_violations += 1
    else:
        consecutive_violations = 0
    # -----------------------------------------------

    # ---------------- RISK ESCALATION ----------------
    if consecutive_violations == 0:
        risk_level = "LOW"
    elif consecutive_violations == 1:
        risk_level = "MEDIUM"
    elif consecutive_violations == 2:
        risk_level = "HIGH"
    else:
        risk_level = "CRITICAL"
    # ------------------------------------------------

    buffered = io.BytesIO()
    img.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    # Create report WITHOUT hash first
    report_data = {
        "timestamp": datetime.now().isoformat(),
        "total_people": len(people),
        "helmets": len(helmets),
        "violations": violations,
        "consecutive_violations": consecutive_violations,
        "risk_level": risk_level,
    }

    # 🔐 Generate integrity hash
    report_hash = generate_hash(report_data)

    # Final secured report
    report = {
        **report_data,
        "hash": report_hash,
        "annotated_image": img_str,
    }

    reports.append(report)
    if len(reports) > 20:
        reports.pop(0)

    return jsonify(report)

@app.route("/reports", methods=["GET"])
def get_reports():
    return jsonify(reports)

@app.route("/verify/<int:index>", methods=["GET"])
def verify_report(index):
    """
    Verify integrity of a report
    """
    if index >= len(reports):
        return jsonify({"error": "Invalid report index"}), 400

    stored_report = reports[index]
    stored_hash = stored_report["hash"]

    # Recreate report data
    report_data = {
        "timestamp": stored_report["timestamp"],
        "total_people": stored_report["total_people"],
        "helmets": stored_report["helmets"],
        "violations": stored_report["violations"],
        "consecutive_violations": stored_report["consecutive_violations"],
        "risk_level": stored_report["risk_level"],
    }

    recalculated_hash = generate_hash(report_data)

    return jsonify({
        "tampered": stored_hash != recalculated_hash,
        "stored_hash": stored_hash,
        "recalculated_hash": recalculated_hash
    })

if __name__ == "__main__":
    app.run(debug=True)
