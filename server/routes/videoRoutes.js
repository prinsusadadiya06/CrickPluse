import express from "express";
import { addVideos, getVideos } from "../controllers/videoController.js";

const router = express.Router();

// Add multiple videos
router.post("/add", addVideos);

// Get all videos
router.get("/", getVideos);

export default router;