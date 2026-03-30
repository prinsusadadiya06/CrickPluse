import express from "express";
import Advertise from "../models/Advertise.js";

const router = express.Router();

// POST Advertise Form
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      company,
      city,
      subject,
      requirements
    } = req.body;

    const newAdvertise = await Advertise.create({
      name,
      email,
      mobile,
      company,
      city,
      subject,
      requirements
    });

    res.json({ message: "Advertise form submitted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error submitting advertise form" });
  }
});

export default router;