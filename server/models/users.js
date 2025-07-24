const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User", UserSchema);
