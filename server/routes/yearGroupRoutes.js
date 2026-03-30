import express from "express";
import { getYearGroups } from "../controllers/yearGroupController.js";

const router = express.Router();

router.get("/", getYearGroups);

export default router;