const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect('mongodb+srv://pms175:12345@cluster0.7ad8d8u.mongodb.net/pms', {
=======
mongoose.connect('mongodb+srv://tuma2002:12345@cluster0.7ad8d8u.mongodb.net/pms', {
>>>>>>> 93448035b476797ed7d07721ff78f87e12e98669
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err.message));

module.exports = mongoose;
