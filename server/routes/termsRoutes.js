import express from "express";
import Terms from "../models/Terms.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Terms.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching terms" });
  }
});

export default router;