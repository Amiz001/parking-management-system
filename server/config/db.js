const mongoose = require('mongoose');

<<<<<<< HEAD
<<<<<<< HEAD
mongoose.connect('mongodb+srv://pms175:12345@cluster0.7ad8d8u.mongodb.net/pms', {
=======
mongoose.connect('mongodb+srv://tuma2002:12345@cluster0.7ad8d8u.mongodb.net/pms', {
>>>>>>> d01adaf6e2068ee44084d21d35bc93902436922f
=======
mongoose.connect('mongodb+srv://azeezar2002:12345@cluster0.7ad8d8u.mongodb.net/pms', {
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err.message));

module.exports = mongoose;