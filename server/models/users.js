const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  membership: {
    type: String,
    enum: ["default","silver", "gold", "platinum"], 
    default: "default"
  },
  status: {
    type: String,
    enum: ["active", "inactive", "banned"],
    default: "active",
  },
  role: {
    type: String,
    enum: ["user", "operator", "admin", "customer support"],
    default: "user",
  },
  profilePhoto: {
    type: String,
    default: "/uploads/default.jpg",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
