const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },  
  email: { type: String, required: true, unique: true },
  phone: {type: String, required: false,},
  password: { type: String, required: true },
  membership: { type: mongoose.Schema.Types.ObjectId, ref: "MembershipPlan", default: new mongoose.Types.ObjectId("68e8e6e1d624452830ceaf2b") },
  status: { type: String, enum: ["active", "inactive", "banned"], default: "active" },
  role: { type: String, enum: ["user", "operator", "admin", "customer support"], default: "user" },
  profilePhoto: { type: String, default: "/uploads/default.webp" },
  isVerified: { type: Boolean, default: false }, 
  verificationCode: { type: String },         
  verificationCodeExpires: { type: Date },       
  resetPasswordCode: { type: String },         
  resetPasswordCodeExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
