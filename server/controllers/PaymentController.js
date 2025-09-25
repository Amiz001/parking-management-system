const Payment = require("../models/PaymentModel");

// Get all payments
const getAllPayment = async (req, res) => {
  try {
    const payments = await Payment.find();
    return res.status(200).json({ payments });
  } catch (err) {
    console.error("Error fetching payments:", err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Add new payment
const addPayment = async (req, res) => {
  console.log("Received body:", req.body); // <-- add this
  const { vehicleNumber, amount, entryDate, duration } = req.body;

  try {
    const payment = new Payment({
      vehicleNumber,
      amount: Number(amount),
      entryDate: entryDate ? new Date(entryDate) : new Date(),
      duration,
    });
    await payment.save();
    return res.status(201).json({ payment });
  } catch (err) {
    console.error("Payment save error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};


// Get payment by ID
const getById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Update payment
const updatePayment = async (req, res) => {
  const { vehicleNumber, amount, entryDate, duration } = req.body;

  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        vehicleNumber,
        amount: Number(amount),
        entryDate: entryDate ? new Date(entryDate) : new Date(),
        duration,
      },
      { new: true }
    );

    if (!payment) return res.status(404).json({ message: "Unable to update payment" });
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: "Unable to delete payment" });
    return res.status(200).json({ payment });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllPayment,
  addPayment,
  getById,
  updatePayment,
  deletePayment,
};
