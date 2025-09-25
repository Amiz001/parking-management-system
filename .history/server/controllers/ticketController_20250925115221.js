const ticket = require("../models/ticket"); 
// Import the ticket model from the models folder. 
// This allows the server to interact with the 'tickets' collection in MongoDB using Mongoose.

// Export an asynchronous function to handle POST requests for submitting tickets
exports.submitticket = async (req, res) => {
  try {
    // Destructure the required fields from the incoming request body
    const { name, email, subject, description, priority } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !subject || !description || !priority) {
      // If any field is missing, return a 400 Bad Request response with a message
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new instance of the ticket model with the data provided
    const newticket = new ticket({ name, email, subject, description, priority });

    // Save the new ticket document to the MongoDB database
    await newticket.save();

    // If saving is successful, send a 201 Created response with a success message
    res.status(201).json({ message: "Ticket submitted successfully!" });
  } catch (error) {
    // If any error occurs during processing, log it to the server console
    console.error(error);
    // Send a 500 Internal Server Error response with the error message
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
