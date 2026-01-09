import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import Scan from "../models/Scan.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * @route   GET /api/admin/scans
 * @desc    Get all users scan history (Admin only)
 * @access  Private/Admin
 */
router.get("/scans", protect, adminOnly, async (req, res) => {
  try {
    const scans = await Scan.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(scans);
  } catch (error) {
    console.error("Admin scan fetch error:", error.message);
    res.status(500).json({ message: "Failed to fetch admin scans" });
  }
});

export default router;
