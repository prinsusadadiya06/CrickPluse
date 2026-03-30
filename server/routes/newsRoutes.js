import express from "express";
import News from "../models/News.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await News.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news" });
  }
});

export default router;