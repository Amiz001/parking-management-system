const Users = require("../models/users");
const DeleteRequests = require("../models/deleteRequests");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const getUsers = async (req, res) => {
  try {
    console.log("function called");
    const users = await Users.find().populate("membership").lean();

    console.log("still ok");
    if (!users) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await Users.findById(id).populate("membership").lean();

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    const resetPasswordCode = crypto.randomInt(100000, 999999).toString();
    const resetPasswordCodeExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.resetPasswordCode = resetPasswordCode;
    user.resetPasswordCodeExpires = resetPasswordCodeExpires;
    await user.save();

    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken?.token,
      },
    });

    const mailOptions = {
      from: `"Park Bay" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password using this code",
      text: `Hi ${user.fname},\n\nYour password reset code is: ${resetPasswordCode}\n\nThis code will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");

    res.status(200).json({ message: "Verification code sent!", user: user });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const getDeleteRequests = async (req, res) => {
  try {
    const deleteRequests = await DeleteRequests.find()
      .populate("userId")
      .lean();

    if (deleteRequests.length === 0) {
      return res.status(200).json({ message: "No delete requests found" });
    }

    return res.json(deleteRequests);
  } catch (err) {
    console.error("Error fetching delete requests:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const getDeleteRequestById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteRequest = await DeleteRequests.findOne({ userId: id });

    return res.json(deleteRequest);
  } catch (err) {
    console.error("Error fetching delete requests:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const addDeleteRequest = async (req, res) => {
  try {
    const { userId, reason } = req.body;

    console.log(userId + "  " + reason);

    const existingReq = await DeleteRequests.findOne({ userId });
    if (existingReq) {
      return res.json({ message: "Requests already exists!" });
    }

    console.log("These are already found: " + existingReq);

    const deleteReq = new DeleteRequests({
      userId,
      reason,
    });

    const result = await deleteReq.save();

    if (!result) {
      return res.json({ message: "Delete request failed!" });
    }
    res.json({ message: "Delete request sent successfully!" });
  } catch (err) {
    console.error("Delete request error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateDeleteRequestStatus = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    if (!["accepted", "declined"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedRequest = await DeleteRequests.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Delete request not found" });
    }

    // ✅ delete user ONLY if accepted
    if (status === "accepted") {
      await Users.findByIdAndDelete(updatedRequest.userId);
    }

    return res.status(200).json({
      message: `Status updated to "${status}"`,
      request: updatedRequest,
    });
  } catch (err) {
    console.error("Update delete request error:", err);
    return res.status(500).json({ message: err.message });
  }
};


const deleteDeleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("deleteDeleteRequest called for id:", req.params.id);

    const deletedRequest = await DeleteRequests.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRequest) {
      return res.status(404).json({ message: "Delete request not found!" });
    }

    return res
      .status(200)
      .json({ message: "Delete request deleted successfully!" });
  } catch (err) {
    console.error("Error deleting delete request:", err);
    return res
      .status(500)
      .json({ message: "Server error while deleting delete request!" });
  }
};

const addUser = async (req, res) => {
  try {
    const { fname, lname, email, phone, role, password, profilePhoto } =
      req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      fname,
      lname,
      email,
      phone,
      role,
      password: hashedPassword,
      profilePhoto,
    });

    const result = await user.save();

    if (!result) {
      return res.status(404).json({ message: "Failed!" });
    }

    res.status(201).json({
      message: "Added successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fname, lname, email, phone, role, profilePhoto } = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { fname, lname, email, phone, role, profilePhoto },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "Update failed!" });
    }

    res
      .status(202)
      .json({ message: "Updated successfully!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fname, lname, email, phone, profilePhoto } = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { fname, lname, email, phone, profilePhoto, isVerified: false },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "Update failed!" });
    }

    res
      .status(202)
      .json({ message: "Updated successfully!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "Deletion failed!" });
    }

    res.json({ message: "Deleted successfully!", user: deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const validateUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const expireTime = () => {
      return rememberMe ? "30d" : "2h";
    };

    const token = jwt.sign(
      {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profilePhoto: user.profilePhoto,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: expireTime(),
      }
    );

    res.json({
      message: "User Found!",
      token,
      user: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    console.log(firstName);

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new Users({
      fname: firstName,
      lname: lastName,
      email,
      phone,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpires: expirationTime,
      isVerified: false,
    });

    const result = await newUser.save();
    if (!result) {
      return res.status(400).json({ message: "User registration failed!" });
    }

    console.log("User saved successfully");

    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const accessToken = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken?.token,
      },
    });

    const mailOptions = {
      from: `"Park Bay" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      text: `Hi ${firstName},\n\nYour verification code is: ${verificationCode}\n\nThis code will expire in 10 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailErr) {
      console.error("Email failed:", mailErr);
    }

    console.log("Verification email sent");

    res.status(200).json({ message: "Verification code sent to your email!" });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: `Internal Server Error! ${err}` });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Already verified" });

    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid verification code" });

    if (new Date() > user.verificationCodeExpires)
      return res
        .status(400)
        .json({ message: "Code expired, request a new one" });

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(400).json({ message: "User not verified" });

    if (user.resetPasswordCode !== code)
      return res.status(400).json({ message: "Invalid verification code" });

    if (new Date() > user.resetPasswordCodeExpires)
      return res
        .status(400)
        .json({ message: "Code expired, request a new one" });

    user.resetPasswordCode = null;
    user.resetPasswordCodeExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const setPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const id = req.params.id;

    console.log(id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({ message: "Password not updated!" });
    }

    res.status(200).json({
      message: "Password changed successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error while updating password!" });
  }
};

const verifyPassword = async (req, res) => {
  try {
    const { userId, oldPassword } = req.body;

    const user = await Users.findById({ _id: userId });

    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    return res.status(200).json({ message: "Valid password!" });
  } catch (err) {
    console.error("Error verifying password:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  getUsers,
  getUserById,
  getDeleteRequests,
  updateDeleteRequestStatus,
  addUser,
  updateUser,
  deleteUser,
  validateUser,
  registerUser,
  verifyEmail,
  verifyCode,
  verifyPassword,
  setPassword,
  getUserByEmail,
  updateProfile,
  addDeleteRequest,
  getDeleteRequestById,
  deleteDeleteRequest,
};
