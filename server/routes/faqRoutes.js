import express from "express";
import FAQ from "../models/FAQ.js";

const router = express.Router();

// GET FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs" });
  }
});

export default router;