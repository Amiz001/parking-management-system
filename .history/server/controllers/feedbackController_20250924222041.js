const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { category, feedback } = req.body;

    if (!category || !feedback) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFeedback = new Feedback({ category, feedback });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { submitFeedback };
