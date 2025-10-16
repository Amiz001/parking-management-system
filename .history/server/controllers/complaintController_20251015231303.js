const Complaint = require("../models/ComplaintSchema");

exports.submitComplaint = async (req, res) => {
  try {
    const { userId, name, email, subject, complaint } = req.body;

    if (!userId || !name || !email || !subject || !complaint) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newComplaint = new Complaint({ userId, name, email, subject, complaint });
    await newComplaint.save();

    res.status(201).json({ message: "Complaint submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
