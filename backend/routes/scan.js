import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ message: "Input required" });
  }

  // Fake AI logic (abhi)
  let type = "Text";
  if (input.includes("http")) type = "URL";
  else if (input.includes("@")) type = "Email";
  else if (/^\d+$/.test(input)) type = "Phone";

  const confidence = Math.floor(Math.random() * 40) + 60;

  let level = "Low";
  let color = "success";
  let message = "Safe content";

  if (confidence > 85) {
    level = "High";
    color = "danger";
    message = "Very likely a scam";
  } else if (confidence > 70) {
    level = "Medium";
    color = "warning";
    message = "Suspicious content detected";
  }

  res.json({
    type,
    confidence,
    level,
    color,
    message,
  });
});

export default router;
