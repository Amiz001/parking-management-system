const mongoose = require("mongoose"); 
// Import the Mongoose library. Mongoose is an ODM (Object Data Modeling) tool for MongoDB.
// It allows you to define schemas and interact with MongoDB collections using models.

const feedbackSchema = new mongoose.Schema({
  // Create a new Mongoose schema for the 'feedbacks' collection
  name: { type: String, required: true }, 
  // 'name' field: must be a String and is required
  email: { type: String, required: true }, 
  // 'email' field: must be a String and is required
  category: { type: String, required: true }, 
  // 'category' field: must be a String and is required (e.g., "Feedback", "Complaint", etc.)
  Feedback: { type: String, required: true }, 
  // 'feedback' field: must be a String and is required (the content of the feedback)
  rating: { type: Number, min: 1, max: 5, required: true }, 
  // 'rating' field: must be a Number between 1 and 5 and is required
  createdAt: { type: Date, default: Date.now }, 
  // 'createdAt' field: stores the creation date of the feedback
  // If not provided, it defaults to the current date and time
});

module.exports = mongoose.model("Feedback", feedbackSchema); 
// Create a Mongoose model named "Feedback" based on feedbackSchema
// This model is used to interact with the 'feedbacks' collection in MongoDB
// Export it so it can be imported in controllers like submitFeedback
