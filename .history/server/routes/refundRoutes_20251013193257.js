// routes/feedbackRoutes.js
const express = require("express");
// Import Express

const router = express.Router();
// Create a router instance

const Feedback = require("../models/Feedback");
// Import your Feedback model

// GET all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all feedback documents
    res.status(200).json(feedbacks);         // Send JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a specific feedback by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST route to submit a new feedback
const { submitFeedback } = require("../controllers/feedbackController");
// Import the submitFeedback controller function

router.post("/", submitFeedback);
// When a POST request is made to "/", call submitFeedback

module.exports = router;
// Export router to be used in server.js or app.js
