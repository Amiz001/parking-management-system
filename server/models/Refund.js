const mongoose = require("mongoose"); 
// Import the Mongoose library. Mongoose is an ODM (Object Data Modeling) library for MongoDB.
// It allows defining schemas and interacting with MongoDB collections using models.

const refundSchema = new mongoose.Schema({
  // Define a schema for the 'refunds' collection

  name: { type: String, required: true },           
  // 'name' field: stores the user's name, must be a string and is required

  email: { type: String, required: true },          
  // 'email' field: stores the user's email, must be a string and is required

  orderId: { type: String, required: true },        
  // 'orderId' field: stores the order ID for which refund is requested
  // Stored as a string to handle alphanumeric order IDs, required

  amount: { type: Number, required: true, min: 1 }, 
  // 'amount' field: the refund amount, must be a number
  // Required and minimum value is 1 to ensure positive amounts

  reason: { type: String, required: true },         
  // 'reason' field: user's explanation for requesting the refund, required

  createdAt: { type: Date, default: Date.now },     
  // 'createdAt' field: timestamp when the refund request is created
  // Defaults to the current date and time if not provided
});

module.exports = mongoose.model("Refund", refundSchema); 
// Create a Mongoose model named "Refund" based on refundSchema
// This model is used to interact with the 'refunds' collection in MongoDB
// Export it so it can be imported in controllers like submitRefund
