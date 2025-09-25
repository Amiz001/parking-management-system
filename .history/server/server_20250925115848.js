const cors = require('cors'); 
// Import the CORS middleware. CORS (Cross-Origin Resource Sharing) allows your server
// to accept requests from different domains or ports (useful for front-end and back-end on different origins).

const express = require('express'); 
// Import the Express library. Express is a Node.js framework used to build APIs and web servers.

const app = express(); 
// Create an instance of an Express application. This 'app' is used to define routes and middleware.

require("dotenv").config(); 
// Load environment variables from a .env file into process.env. 
// This allows you to store sensitive info like database URLs or API keys outside the code.

require('./config/db'); 
// Import and execute the database connection configuration.
// Typically, this file connects to MongoDB using Mongoose.

const feedbackRoutes = require('./routes/feedbackRoutes'); 
const complaintRoutes = require('./routes/complaintRoutes'); 
const refundRoutes = require('./routes/refundRoutes'); 
const ticketRoutes = require('./routes/ticketRoutes'); 
// Import the route modules for Feedback, Complaint, Refund, and Ticket endpoints.
// Each file contains routes and controller functions for handling respective API requests.


// Middleware
app.use(express.json()); 
// Built-in middleware to parse incoming JSON requests and put the data in req.body.

app.use(cors()); 
// Apply CORS middleware to allow requests from different origins (like a React frontend).

// Mounting routes
app.use('/api/feedback', feedbackRoutes); 
// Mount the feedback routes at "/api/feedback". 
// Example: POST request to "/api/feedback" will be handled by feedbackRoutes.

app.use('/api/complaint', complaintRoutes); 
// Mount the complaint routes at "/api/complaint". 
// Example: POST request to "/api/complaint" will be handled by complaintRoutes.

app.use('/api/refund', refundRoutes); 
// Mount the refund routes at "/api/refund". 
// Example: POST request to "/api/refund" will be handled by refundRoutes.

app.use('/api/ticket', ticketRoutes); 
// Mount the ticket routes at "/api/ticket". 
// Example: POST request to "/api/ticket" will be handled by ticketRoutes.

app.listen(5000, () => {
    console.log("Server is starting"); 
}); 
// Start the server and make it listen on port 5000. 
// Once the server is running, log "Server is starting" to the console.
