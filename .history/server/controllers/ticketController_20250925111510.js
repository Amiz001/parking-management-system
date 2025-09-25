const ticket = require("../models/ticket");

// POST /api/feedback
exports.submitticket= async (req, res) => {
  try {
    const { name, email, subject, description, priority } = req.body;

    // Validate
    if (!name || !email || !subject || !description || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newticket = new ticket({ name, email, subject, description, priority });
    await newticket.save();

    res.status(201).json({ message: "Ticket submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

