import express from "express";
import Plan from "../models/Plan.js";

const router = express.Router();

// GET all plans
router.get("/", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching plans" });
  }
});

export default router;