const express = require("express"); 
// Import the Express library. Express is a Node.js framework used to build web applications and APIs.

const router = express.Router(); 
// Create a new router instance using Express Router.
// A router allows you to define route endpoints separately and modularly.

const { submitComplaint } = require("../controllers/complaintController"); 
// Import the submitComplaint function from the complaintController.
// This function will handle the logic when a complaint is submitted via POST request.

router.post("/", submitComplaint); 
// Define a POST route on the root path of this router ("/").
// When a POST request is made to this endpoint, the submitComplaint function will be executed.

module.exports = router; 
// Export the router so it can be imported and used in the main server file (e.g., app.js or server.js).
// This allows the complaints routes to be mounted at a specific path like "/api/complaints".
