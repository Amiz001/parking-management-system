import express from "express";r
import { submitComplaint } from "../controllers/complaintControlle.js";

const router = express.Router();
router.post("/", submitComplaint);

export default router;

const express = require("express");
const router = express.Router();
const {  submitComplaint  } = require("../controllers/complaintController");

router.post("/", submitFeedback);

module.exports = router;
