const Users = require("../models/users");
const DeleteRequests = require("../models/deleteRequests");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();

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

    const user = await Users.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const getDeleteRequests = async (req, res) => {
  try {
    const deleteRequests = await DeleteRequests.find();

    if (deleteRequests.length === 0) {
      return res.status(404).json({ message: "No delete requests found" });
    }

    return res.json({ deleteRequests });
  } catch (err) {
    console.error("Error fetching delete requests:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateDeleteRequestStatus = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { status } = req.body;

    const updatedRequest = await DeleteRequests.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Delete request not found" });
    }

    if (status == "accepted") {
      await Users.findByIdAndDelete(requestId);
    }

    return res.status(200).json({
      message: `Status updated to "${status}"`,
      request: updatedRequest,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, role, password, profilePhoto } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
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
    const { name, email, role } = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { name, email, role },
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
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        //profilePhoto: user.profilePhoto,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.json({
      message: "User Found!",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
      password: hashedPassword,
    });

    const result = await user.save();

    if (!result) {
      return res.status(400).json({ message: "User registration failed!" });
    }

    res.json({ message: "Registration successful!", user });
    navigate("/login");
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
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
};
