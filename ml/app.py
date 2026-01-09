from flask import Flask, request, jsonify
import re

app = Flask(__name__)

#Lightweight AI-like heuristic engine
SCAM_KEYWORDS = [
    "login", "verify", "bank", "account",
    "free", "gift", "click", "urgent",
    "password", "otp", "reward", "win"
]

SUSPICIOUS_DOMAINS = [".xyz", ".top", ".tk", ".ml", ".ga"]

def analyze_input(text):
    text = text.lower()
    score = 0
    reasons = []  # NEW: explainable reasons

    # scam keywords
    for word in SCAM_KEYWORDS:
        if word in text:
            score += 20
            reasons.append(f"Contains suspicious keyword: '{word}'")

    # suspicious domains (only if URL)
    if "http" in text or "www" in text:
        for domain in SUSPICIOUS_DOMAINS:
            if domain in text:
                score += 30
                reasons.append(f"Suspicious domain detected: {domain}")

    # FINAL DECISION
    if score >= 60:
        return "Scam", min(score, 95), reasons
    elif score >= 30:
        return "Suspicious", score, reasons
    else:
        return "Safe", max(90 - score, 75), ["No suspicious patterns found"]


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("input", "")

    result, confidence, reasons = analyze_input(text)

    return jsonify({
        "result": result,
        "confidence": confidence,
        "reasons": reasons   #NEW FIELD
    })

if __name__ == "__main__":
    app.run(port=8000, debug=True)
