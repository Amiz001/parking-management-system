const Refund = require("../models/Refund"); 
// Import the Refund model from the models folder. 
// This allows the server to interact with the 'refunds' collection in MongoDB using Mongoose.

// Export an asynchronous function to handle POST requests for submitting refunds
exports.submitRefund = async (req, res) => {
  try {
    // Destructure the required fields from the incoming request body
    const { name, email, orderId, amount, reason } = req.body;

    // Validate that all fields are provided
    if (!name || !email || !orderId || !amount || !reason) {
      // If any field is missing, return a 400 Bad Request response with a message
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new instance of the Refund model with the data provided
    const newRefund = new Refund({ name, email, orderId, amount, reason });

    // Save the new refund document to the MongoDB database
    await newRefund.save();

    // If saving is successful, send a 201 Created response with a success message
    res.status(201).json({ message: "Refund submitted successfully!" });
  } catch (error) {
    // If any error occurs during processing, log it to the server console
    console.error(error);
    // Send a 500 Internal Server Error response with the error message
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
