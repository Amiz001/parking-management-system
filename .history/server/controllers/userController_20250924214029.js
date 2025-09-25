const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const validateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      message: "User Found!",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, profilePhoto } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      profilePhoto,
    });

    const result = await user.save();

    if (!result) {
      return res.status(400).json({ message: "User registration failed!" });
    }

    res.json({ message: "User added!", user });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { validateUser, registerUser };
