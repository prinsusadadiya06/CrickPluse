import express from "express";
import About from "../models/About.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await About.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about us" });
  }
});

export default router;