import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      required: true,
    },
    reasons: {
      type: [String], // explainable AI reasons
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scan", scanSchema);
