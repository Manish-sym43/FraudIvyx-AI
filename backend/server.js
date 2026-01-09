import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

/*ROUTES*/
import authRoutes from "./routes/authRoutes.js";
import scanRoutes from "./routes/scanRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

/*MIDDLEWARE*/
app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* MONGODB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

/*ROUTES*/
app.get("/", (req, res) => {
  res.json({ message: "Fraudivyx Backend Running 🚀" });
});

//Auth
app.use("/api/auth", authRoutes);

//Scan (user-wise)
app.use("/api/scan", scanRoutes);

//User profile
app.use("/api/user", userRoutes);

//Admin panel (ALL USERS DATA)
app.use("/api/admin", adminRoutes);

/*ERROR HANDLER*/
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
