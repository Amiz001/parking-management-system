const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
 name: { type: String, required: true },          // User's name
  email: { type: String, required: true },         // User's email
  subject: { type: String, required: true },       // Ticket subject/title
  description: { type: String, required: true },   // Ticket description/details
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low", required: true }, // Ticket priority
  createdAt: { type: Date, default: Date.now },    // Auto timestamp
});

module.exports = mongoose.model("ticket", ticketSchema);
