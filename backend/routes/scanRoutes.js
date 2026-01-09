import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/scan
 * @desc    Scan input for scam detection
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Input is required" });
    }

    // 🔮 Fake AI logic (demo purpose)
    const result = {
      type: "URL",
      level: "High Risk",
      confidence: 91,
      color: "danger",
      message: "Very likely a scam",
    };

    res.status(200).json(result);

  } catch (error) {
    console.error("Scan error:", error);
    res.status(500).json({ message: "Scan failed" });
  }
});

export default router;
