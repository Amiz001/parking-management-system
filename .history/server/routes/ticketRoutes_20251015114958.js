const express = require("express"); 
// Import the Express library. Express is a Node.js framework used to build web applications and APIs.

const router = express.Router(); 
// Create a new router instance using Express Router.
// Routers allow you to define routes modularly and attach them to specific paths in the main app.

const Ticket = require("../models/Ticket");

const { submitticket } = require("../controllers/ticketController"); 
// Import the submitticket function from the ticketController.
// This function contains the logic to handle POST requests when a user submits a ticket.

// ✅ Get all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

router.post("/", submitticket); 
// Define a POST route at the root path of this router ("/").
// When a POST request is made to this endpoint, the submitticket function is executed.

module.exports = router; 
// Export the router so it can be imported in the main server file (e.g., app.js or server.js).
// This allows mounting the route at a specific path like "/api/ticket", so POST requests to that path call submitticket.
