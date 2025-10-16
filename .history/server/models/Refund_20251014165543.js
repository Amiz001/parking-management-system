const mongoose = require("mongoose");

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

module.exports = mongoose.model("Refund", refundSchema);