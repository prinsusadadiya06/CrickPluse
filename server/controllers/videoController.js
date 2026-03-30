import Video from "../models/Video.js";

// Add videos (bulk insert)
export const addVideos = async (req, res) => {
  try {
    const videos = req.body;

    if (!Array.isArray(videos)) {
      return res.status(400).json({ message: "Data must be an array" });
    }

    const inserted = await Video.insertMany(videos);

    res.status(201).json({
      message: "Videos added successfully",
      data: inserted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};