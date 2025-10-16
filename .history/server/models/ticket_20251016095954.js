const mongoose = require("mongoose"); 
// Import the Mongoose library. Mongoose is an ODM (Object Data Modeling) library for MongoDB.
// It allows defining schemas and interacting with MongoDB collections using models.

const ticketSchema = new mongoose.Schema({
  // Define a schema for the 'tickets' collection

  name: { type: String, required: true },          
  // 'name' field: stores the user's name, must be a string and is required

  email: { type: String, required: true },         
  // 'email' field: stores the user's email, must be a string and is required

  subject: { type: String, required: true },       
  // 'subject' field: stores the ticket title or subject, must be a string and is required

  description: { type: String, required: true },   
  // 'description' field: stores the detailed description of the ticket, required

  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low", required: true }, 
  // 'priority' field: stores the ticket priority
  // Allowed values are "Low", "Medium", or "High"
  // Defaults to "Low" if not provided
  // Required field

  createdAt: { type: Date, default: Date.now },    
  // 'createdAt' field: timestamp when the ticket is created
  // Defaults to the current date and time if not provided

  reply: { type: String, default: "" }, // 👈 add this

});

module.exports = mongoose.model("ticket", ticketSchema); 
// Create a Mongoose model named "ticket" based on ticketSchema
// This model is used to interact with the 'tickets' collection in MongoDB
// Export it so it can be imported in controllers like submitticket
