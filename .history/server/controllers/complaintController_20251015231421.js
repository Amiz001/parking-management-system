const Complaint  = require("../models/ComplaintModel.js"); // Import the Mongoose model for complaints

// Export an async function named submitComplaint to handle complaint submissions
exports.submitComplaint = async (req, res) => {
  try {
    // Destructure name, email, subject, and complaint from the request body
    const { userId , name, email, subject, complaint } = req.body;

    // Check if any required field is missing
    if (userId ||!name || !email || !subject || !complaint) {
      // If missing, send a 400 Bad Request response with an error message
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new Complaint document using the Mongoose model
    const newComplaint = new Complaint({ userId , name, email, subject, complaint });

    // Save the new complaint to the MongoDB database
    await newComplaint.save();

    // Send a 201 Created response indicating the complaint was successfully submitted
    res.status(201).json({ message: "Complaint submitted successfully!" });
  } catch (error) {
    // If any error occurs during the process, catch it and send a 500 Server Error response
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
