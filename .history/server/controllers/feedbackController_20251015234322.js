const Feedback = require("../models/Feedback"); 
// Import the Feedback model from the models folder. 
// This allows us to interact with the 'feedbacks' collection in MongoDB using Mongoose.


// feedbackController.js
const submitFeedback = async (req, res) => {
  try {
    const { name, email, Feedback, rating } = req.body;
    if (!name || !email || !Feedback) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const feedback = new Feedback({ name, email, message, rating });
    await feedback.save();
    res.status(201).json({ message: "Feedback saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Export a function to handle POST requests to submit feedback
exports.submitFeedback = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { name, email, category, feedback, rating } = req.body;

    // Validate that all fields are present
    if (!name || !email || !category || !feedback || !rating) {
      // If any field is missing, return a 400 Bad Request response
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new instance of the Feedback model with the provided data
    const newFeedback = new Feedback({ name, email, category, feedback, rating });

    // Save the new feedback to the MongoDB database
    await newFeedback.save();

    // If successful, return a 201 Created response with a success message
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    // If an error occurs, log it to the server console for debugging
    console.error(error);
    // Return a 500 Server Error response with the error message
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
