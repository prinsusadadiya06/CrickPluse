import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import specialRoutes from "./routes/specialRoutes.js";
import archiveRoutes from "./routes/archiveRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import advertiseRoutes from "./routes/advertiseRoutes.js";
import privacyRoutes from "./routes/privacyRoutes.js";
import termsRoutes from "./routes/termsRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import yearGroupRoutes from "./routes/yearGroupRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/teams", teamRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/news", newsRoutes);
app.use("/api/specials", specialRoutes);
app.use("/api/archive", archiveRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/advertise", advertiseRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/terms", termsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/archive/years", yearGroupRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server start
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});