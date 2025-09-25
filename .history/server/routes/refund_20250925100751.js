import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Refund from "../models/Refund.js";

const router = express.Router();

// Request refund
router.post("/", async (req, res) => {
  try {
    const refund = new Refund(req.body);
    await refund.save();
    res.status(201).json({ message: "✅ Refund request submitted", refund });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all refunds (Admin)
router.get("/", async (req, res) => {
  try {
    const refunds = await Refund.find();
    res.json(refunds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update refund status (Admin)
router.put("/:id", async (req, res) => {
  try {
    const refund = await Refund.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(refund);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;


const express = require("express");
const router = express.Router();
const { submitRefund } = require("../controllers/refundController");

router.post("/", submitRefund);

module.exports = router;
