const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {

  try{
    const users = await Users.find();

  if (!users) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
}

const getUserById = () => {}

const addUser = async (req, res) => {

  try{

    const {name, email, role, password, profilePhoto} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name, 
      email,
      role,
      password: hashedPassword,
      profilePhoto
    })

    const result = user.save();

  if (!result) {
      return res.status(404).json({ message: "Failed!" });
    }

    res.status(201).json({
      message: "Added successfully",
      user: result
    });

  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
}

const updateUser = async (req, res) => {
  try {

    const userId = req.params.id;
    const {name, email, role} = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true }
    )

    if(!updatedUser){
      res.status(404).json({message: "Update failed!"});
    }

    res.status(202).json({message: "Updated successfully!", user: updatedUser});

  } catch(err){
    res.status(500).json({message: err.message})
  }
}

const deleteUser = async (req, res) => {

  try{
    const userId = req.params.id;

  const deletedUser = await Users.findByIdAndDelete(userId);

  if(!deletedUser){
    res.status(404).json({message: "Deletion failed!"});
  }

  res.json({message: "Deleted successfully!", user: deletedUser});
  } catch(err){
    res.status(500).json({ message: err.message });
  }
}

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

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role, profilePhoto: user.profilePhoto }, process.env.JWT_SECRET, {
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
    const { name , email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
      password: hashedPassword
    });

    const result = await user.save();

    if (!result) {
      return res.status(400).json({ message: "User registration failed!" });
    }

    res.json({ message: "Registration successful!", user });
    navigate('/login');

  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser, validateUser, registerUser };
