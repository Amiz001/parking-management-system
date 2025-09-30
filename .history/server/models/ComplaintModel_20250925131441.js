const mongoose = require("mongoose"); 
// Import the Mongoose library. Mongoose is an ODM (Object Data Modeling) library for MongoDB.
// It allows you to define schemas and interact with MongoDB collections using models.

const complaintSchema = new mongoose.Schema({
  // Create a new Mongoose schema for the 'complaints' collection
  name: { type: String, required: true }, 
  // 'name' field: must be a String and is required
  email: { type: String, required: true }, 
  // 'email' field: must be a String and is required
  subject: { type: String, required: true }, 
  // 'subject' field: must be a String and is required
  complaint: { type: String, required: true }, 
  // 'complaint' field: must be a String and is required
  createdAt: { type: Date, default: Date.now }, 
  // 'createdAt' field: stores the creation date of the complaint
  // If not provided, it defaults to the current date and time
});

module.exports = mongoose.model("Complaint", complaintSchema); 
// Create a Mongoose model named "Complaint" based on the complaintSchema
// This model is used to interact with the 'complaints' collection in MongoDB
// Export it so it can be imported in controllers or other parts of the application
