const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  name: { type: String, required: true },           // User's name
  email: { type: String, required: true },          // User's email
  orderId: { type: String, required: true },        // Order ID (string to store any alphanumeric IDs)
  amount: { type: Number, required: true, min: 1 }, // Refund amount (must be a positive number)
  reason: { type: String, required: true },         // Reason for refund (user's explanation)
  createdAt: { type: Date, default: Date.now },     // Auto timestamp
});

module.exports = mongoose.model("Refund", refundSchema);
