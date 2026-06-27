const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected successfully!"))
.catch(err => console.log("MongoDB error:", err.message));

module.exports = mongoose;