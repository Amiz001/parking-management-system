const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tuma2002:12345@cluster0.7ad8d8u.mongodb.net/pms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err.message));

module.exports = mongoose;
