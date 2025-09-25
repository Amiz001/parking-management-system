
const Refund = require("../models/Refund");

// POST /api/feedback
exports.submitRefund= async (req, res) => {
  try {
    const { name, email, orderId, amount, reason } = req.body;

    // Validate
    if (!name || !email || !orderId || !amount || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRefund = new Refund({ name, email, orderId, amount, reason });
    await newRefund.save();

    res.status(201).json({ message: "Refund submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

