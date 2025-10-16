const ticket = require("../models/ticket"); 
// Import the ticket model from the models folder. 
// This allows the server to interact with the 'tickets' collection in MongoDB using Mongoose.
const nodemailer = require("nodemailer");
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
 exports.replyTicket = async (req, res) => {
  try {
    const { reply } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // ✅ Save reply to the database
    ticket.reply = reply;
    await ticket.save();

    // ✅ Send reply to the user's email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use your SMTP provider
      auth: {
        user: "yourcompany@gmail.com", // 👈 replace with your sender email
        pass: "your-app-password", // 👈 use Gmail App Password (not your real password)
      },
    });

    const mailOptions = {
      from: `"Customer Support" <yourcompany@gmail.com>`,
      to: ticket.email, // 👈 send to user who raised the ticket
      subject: `Reply to your ticket: ${ticket.subject}`,
      html: `
        <h2>Hello ${ticket.name || "User"},</h2>
        <p>We’ve reviewed your ticket:</p>
        <blockquote>${ticket.description}</blockquote>
        <hr />
        <p><b>Our reply:</b></p>
        <p>${reply}</p>
        <hr />
        <p style="font-size:12px;color:gray;">This is an automated support email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Reply sent successfully and email delivered!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while sending reply" });
  }
};
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
