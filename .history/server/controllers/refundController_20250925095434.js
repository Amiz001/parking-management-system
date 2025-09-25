const Feedback = require("../models/Feedback");

// POST /api/feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, category, feedback, rating } = req.body;

    // Validate
    if (!name || !email || !category || !feedback || !rating) {
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
