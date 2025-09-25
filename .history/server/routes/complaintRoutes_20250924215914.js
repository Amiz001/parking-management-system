import express from "express";
import { submitComplaint } from "../controllers/complaintController.js";

const router = express.Router();
router.post("/", submitComplaint);

export default router;
