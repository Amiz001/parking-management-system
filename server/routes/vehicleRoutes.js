const express = require('express');
const router = express.Router();

const {getVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle,} = require('../controllers/vehicleController');

router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.post('/', addVehicle);
router.put('/:id', updateVehicle);
router.delete('/:id', deleteVehicle);

module.exports = router;

