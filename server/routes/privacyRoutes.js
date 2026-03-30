import express from "express";
import Privacy from "../models/Privacy.js";

const router = express.Router();

// GET Privacy Policy
router.get("/", async (req, res) => {
  try {
    const data = await Privacy.findOne().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching privacy policy" });
  }
});

export default router;