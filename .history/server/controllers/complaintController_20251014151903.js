import Complaint from "../models/ComplaintModel.js"; // Import the Mongoose model for complaints

// Export an async function named submitComplaint to handle complaint submissions
export const submitComplaint = async (req, res) => {
  try {
    // Destructure name, email, subject, and complaint from the request body
    const { name, email, subject, complaint } = req.body;

    // Check if any required field is missing
    if (!name || !email || !subject || !complaint) {
      // If missing, send a 400 Bad Request response with an error message
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new Complaint document using the Mongoose model
    const newComplaint = new Complaint({ name, email, subject, complaint });

    // Save the new complaint to the MongoDB database
    await newComplaint.save();

    // Send a 201 Created response indicating the complaint was successfully submitted
    res.status(201).json({ message: "Complaint submitted successfully!" });
  } catch (error) {
    // If any error occurs during the process, catch it and send a 500 Server Error response
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Save complaint
const createComplaint = async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully 🚀" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit complaint" });
  }
};

// ✅ Fetch all complaints
const getComplaints = async (req, res) => {
  try {
    // Fetch all complaints and sort by newest first
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });

    // Send success response
    res.status(200).json(complaints);
  } catch (error) {
    // Send error response
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
};

 module.exports = {createComplaint , getComplaints};

