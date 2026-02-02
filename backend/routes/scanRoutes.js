import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Scan from "../models/Scan.js";

const router = express.Router();

/* ================= TYPE DETECTION ================= */
const detectType = (input) => {
  if (input.startsWith("http") || input.includes("www")) return "URL";
  if (input.includes("@")) return "Email";
  if (/^\+?\d{10,}$/.test(input)) return "Phone Number";
  return "Text / Message";
};


/* ================= SCAM DETECTOR (NO ML NEEDED) ================= */

const SCAM_KEYWORDS = [
  "login","verify","bank","account",
  "free","gift","click","urgent",
  "password","otp","reward","win"
];

const SUSPICIOUS_DOMAINS = [".xyz",".top",".tk",".ml",".ga"];

const analyzeInput = (text) => {
  text = text.toLowerCase();

  let score = 0;
  const reasons = [];

  // keyword check
  SCAM_KEYWORDS.forEach(word => {
    if (text.includes(word)) {
      score += 20;
      reasons.push(`Contains suspicious keyword: '${word}'`);
    }
  });

  // domain check
  if (text.includes("http") || text.includes("www")) {
    SUSPICIOUS_DOMAINS.forEach(domain => {
      if (text.includes(domain)) {
        score += 30;
        reasons.push(`Suspicious domain detected: ${domain}`);
      }
    });
  }

  // final result
  if (score >= 60) {
    return { result: "Scam", confidence: 95, reasons };
  }

  if (score >= 30) {
    return { result: "Suspicious", confidence: score, reasons };
  }

  return {
    result: "Safe",
    confidence: 90,
    reasons: ["No suspicious patterns found"]
  };
};


/**
 * @route   POST /api/scan
 * @desc    Scan input for scam detection + save history
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Input is required" });
    }

    /* ⭐ DIRECT ANALYSIS (NO ML CALL) */
    const { result, confidence, reasons } = analyzeInput(input);

    const type = detectType(input);

    let level = "Low Risk";
    let color = "success";
    let message = "No scam patterns detected";

    if (result === "Scam") {
      level = "High Risk";
      color = "danger";
      message = "Scam patterns detected";
    } 
    else if (result === "Suspicious") {
      level = "Medium Risk";
      color = "warning";
      message = "Some suspicious indicators found";
    }

    await Scan.create({
      user: req.userId,
      input,
      type,
      level,
      confidence,
      reasons,
    });

    res.status(200).json({
      type,
      level,
      confidence,
      color,
      message,
      reasons,
    });

  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({ message: "Scan failed" });
  }
});


/**
 * @route   GET /api/scan/history
 * @desc    Get scan history of logged-in user
 * @access  Private
 */
router.get("/history", protect, async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.status(200).json(scans);
  } catch (error) {
    console.error("History fetch error:", error);
    res.status(500).json({ message: "Failed to fetch scan history" });
  }
});

export default router;
