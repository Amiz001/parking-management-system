const express = require("express"); 
// Import the Express library. Express is a Node.js framework used to build web applications and APIs.

const router = express.Router(); 
// Create a new router instance using Express Router.
// Routers allow you to define routes modularly and attach them to specific paths in the main app.

const Feedback = require("../models/Feedback");

const { submitFeedback } = require("../controllers/feedbackController"); 
// Import the submitFeedback function from the feedbackController.
// This function contains the logic to handle POST requests when a user submits feedback.

router.post("/", submitFeedback); 
// Define a POST route at the root path of this router ("/").
// When a POST request is made to this endpoint, the submitFeedback function is executed.

// ✅ Fetch all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: "Failed to fetch feedbacks" });
  }
});




module.exports = router; 
// Export the router so it can be imported in the main server file (e.g., app.js or server.js).
// This allows mounting the route at a specific path like "/api/feedback", so POST requests to that path call submitFeedback.
