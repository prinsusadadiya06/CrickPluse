import express from "express";
import Special from "../models/Special.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Special.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching specials" });
  }
});

export default router;