import express from "express";
import {
  getMatches,
  addMatchesBulk,
  addMatch
} from "../controllers/matchController.js";

const router = express.Router();

router.get("/", getMatches);
router.post("/", addMatch);
router.post("/bulk", addMatchesBulk);

export default router;