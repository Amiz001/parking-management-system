import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const refundSchema = new mongoose.Schema({
  transactionId: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  reason: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Refund", refundSchema);
