import express from "express";
import Team from "../models/Team.js";

const router = express.Router();

//  GET ALL TEAMS
router.get("/", async (req, res) => {
  try {
    const teamsData = await Team.find();
    res.json(teamsData);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

export default router;