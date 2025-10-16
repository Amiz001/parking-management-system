const Vehicle = require("../models/vehicle");
const DeleteRequests = require("../models/deleteRequests");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    if (!vehicles) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const id = req.params.id;

    const vehicle = await Vehicle.findById(id).populate('userId').lean();;

    if (!vehicle) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const addVehicle = async (req, res) => {
  try {
    const { userId, vehicleNo, type, model } = req.body;
    
    const existingVehicle = await Vehicle.findOne({ vehicleNo });
    if (existingVehicle) {
      return res.json({ message: "Vehicle already exists!" });
    }
5
    const vehicle = new Vehicle({
      userId,
      vehicleNo,
      type,
      model
    });

    const result = await vehicle.save();

    if (!result) {
      return res.status(404).json({ message: "Failed!" });
    }

    res.status(201).json({
      message: "Added successfully",
      vehicle: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error!" });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    const { vehicleNo, type, model } = req.body;

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { vehicleNo, type, model },
      { new: true }
    );

    if (!updatedVehicle) {
      res.status(404).json({ message: "Update failed!" });
    }

    res
      .status(202)
      .json({ message: "Updated successfully!", vehicle: updatedVehicle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const {id} = req.params;

    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      res.status(404).json({ message: "Deletion failed!" });
    }

    res.json({ message: "Deleted successfully!", vehicle: deletedVehicle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle,
};