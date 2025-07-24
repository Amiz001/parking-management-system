const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err.message));

module.exports = mongoose;
