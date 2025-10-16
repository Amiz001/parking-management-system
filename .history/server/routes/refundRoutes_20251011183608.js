const express = require("express"); 
// Import the Express library. Express is a Node.js framework used to build web applications and APIs.

const router = express.Router(); 
// Create a new router instance using Express Router.
// Routers allow you to define routes modularly and attach them to specific paths in the main app.

const Refund = require("../models/Refund"); // Your MongoDB model

router.get("/", async (req, res) => {
  try {
    const refunds = await Refund.find(); // Fetch all refund documents from MongoDB
    res.status(200).json(refunds);       // Send data back as JSON
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE route to delete a specific refund by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRefund = await Refund.findByIdAndDelete(id);
    
    if (!deletedRefund) {
      return res.status(404).json({ message: "Refund not found" });
    }
    
    res.status(200).json({ message: "Refund deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const { submitRefund } = require("../controllers/refundController"); 
// Import the submitRefund function from the refundController.
// This function contains the logic to handle POST requests when a user submits a refund request.

router.post("/", submitRefund); 
// Define a POST route at the root path of this router ("/").
// When a POST request is made to this endpoint, the submitRefund function is executed.

module.exports = router; 
// Export the router so it can be imported in the main server file (e.g., app.js or server.js).
// This allows mounting the route at a specific path like "/api/refund", so POST requests to that path call submitRefund.
