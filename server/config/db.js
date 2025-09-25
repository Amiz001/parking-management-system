const mongoose = require('mongoose');

<<<<<<< HEAD
mongoose.connect('mongodb+srv://pms175:12345@cluster0.7ad8d8u.mongodb.net/pms', {
=======
mongoose.connect('mongodb+srv://tuma2002:12345@cluster0.7ad8d8u.mongodb.net/pms', {
>>>>>>> d01adaf6e2068ee44084d21d35bc93902436922f
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err.message));

module.exports = mongoose;