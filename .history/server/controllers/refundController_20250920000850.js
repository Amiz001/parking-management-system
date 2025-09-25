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
