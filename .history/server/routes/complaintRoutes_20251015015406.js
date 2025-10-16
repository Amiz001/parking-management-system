const express = require("express"); 
// Import the Express library. Express is a Node.js framework used to build web applications and APIs.

const router = express.Router(); 
// Create a new router instance using Express Router.
// A router allows you to define route endpoints separately and modularly.

const Complaint = require("../models/ComplaintModel"); 
// Import the submitComplaint function from the complaintController.
// This function will handle the logic when a complaint is submitted via POST request.

router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find(); // Fetch all refund documents from MongoDB
    res.status(200).json(complaints);       // Send data back as JSON
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE route to delete a specific refund by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    
    if (!deletedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


const { submitComplaint} = require("../controllers/complaintController"); 

router.post("/", submitComplaint); 
// Define a POST route on the root path of this router ("/").
// When a POST request is made to this endpoint, the submitComplaint function will be executed.

module.exports = router; 
// Export the router so it can be imported and used in the main server file (e.g., app.js or server.js).
// This allows the complaints routes to be mounted at a specific path like "/api/complaints".
