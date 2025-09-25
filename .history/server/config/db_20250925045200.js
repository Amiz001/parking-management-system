const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db"); // ✅ import the function
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/feedback", feedbackRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
