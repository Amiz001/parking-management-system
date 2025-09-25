import Refund from "../models/Refund.js";

// ✅ Request refund
export const requestRefund = async (req, res) => {
  try {
    const refund = new Refund(req.body);
    await refund.save();
    res.status(201).json({ message: "✅ Refund request submitted", refund });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all refunds (Admin)
export const getRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find();
    res.json(refunds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update refund status (Admin)
export const updateRefund = async (req, res) => {
  try {
    const refund = await Refund.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(refund);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const Refund = require("../models/Refund");

// POST /api/feedback
exports.submitRefund= async (req, res) => {
  try {
    const { name, email, orderId, amount, reason } = req.body;

    // Validate
    if (!name || !email || !orderId || !amount || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFeedback = new Feedback({ name, email, category, feedback, rating });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

