import express from "express";
import {
  getArchive,
  getCategories,
} from "../controllers/archiveController.js";

const router = express.Router();

router.get("/", getArchive);
router.get("/categories", getCategories);


export default router;