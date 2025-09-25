const Users = require("../models/users");
const DeleteRequests = require("../models/deleteRequests");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
<<<<<<< HEAD
  try {
    const users = await Users.find();

    if (!users) {
=======

  try{
    const users = await Users.find();

  if (!users) {
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f
      return res.status(404).json({ message: "Not found" });
    }

    res.json(users);
<<<<<<< HEAD
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const getUserById = () => {};

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
=======

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
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f
      return res.status(404).json({ message: "Failed!" });
    }

    res.status(201).json({
      message: "Added successfully",
<<<<<<< HEAD
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
=======
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
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f

    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { name, email, role },
      { new: true }
<<<<<<< HEAD
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
=======
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
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f

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

<<<<<<< HEAD
    /*const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );*/
=======
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role, profilePhoto: user.profilePhoto }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f

    res.json({
      message: "User Found!",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const registerUser = async (req, res) => {
  try {
<<<<<<< HEAD
    const { name, email, password } = req.body;
=======
    const { name , email, password } = req.body;
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({
      name,
      email,
<<<<<<< HEAD
      password: hashedPassword,
=======
      password: hashedPassword
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f
    });

    const result = await user.save();

    if (!result) {
      return res.status(400).json({ message: "User registration failed!" });
    }

    res.json({ message: "Registration successful!", user });
<<<<<<< HEAD
    navigate("/login");
=======
    navigate('/login');

>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

<<<<<<< HEAD
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
=======
module.exports = { getUsers, getUserById, addUser, updateUser, deleteUser, validateUser, registerUser };
>>>>>>> d60c115ef0dc9e7934436a11d7c217d87ca67d1f
