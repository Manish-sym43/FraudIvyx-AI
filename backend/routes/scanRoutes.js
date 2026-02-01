import express from "express";
import axios from "axios";
import { protect } from "../middleware/authMiddleware.js";
import Scan from "../models/Scan.js";

const router = express.Router();

/*TYPE DETECTION*/
const detectType = (input) => {
  if (input.startsWith("http") || input.includes("www")) return "URL";
  if (input.includes("@")) return "Email";
  if (/^\+?\d{10,}$/.test(input)) return "Phone Number";
  return "Text / Message";
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

    //Call Python AI service
    const aiResponse = await axios.post(
      `${process.env.ML_URL}/predict`,
      { input }
    );

    const { result, confidence, reasons } = aiResponse.data;

    const type = detectType(input);

    let level = "Low Risk";
    let color = "success";
    let message = "No scam patterns detected";

    if (result === "Scam") {
      level = "High Risk";
      color = "danger";
      message = "AI detected phishing / scam patterns";
    } else if (result === "Suspicious") {
      level = "Medium Risk";
      color = "warning";
      message = "Some suspicious indicators found";
    }

    //FIX 1: req.userId use karo
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
    console.error("Scan error:", error.message);
    res.status(500).json({ message: "AI scan failed" });
  }
});

/**
 * @route   GET /api/scan/history
 * @desc    Get scan history of logged-in user
 * @access  Private
 */
router.get("/history", protect, async (req, res) => {
  try {
    //FIX 2: req.userId use 
    const scans = await Scan.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.status(200).json(scans);
  } catch (error) {
    console.error("History fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch scan history" });
  }
});

export default router;
