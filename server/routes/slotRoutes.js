// server/routes/slots.js
const express = require('express');
const router = express.Router();
const Slot = require('../models/slots');
const ctrl = require('../controllers/slotController');

router.get('/', ctrl.getAllSlots);
router.post('/', ctrl.addSlots);
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.updateSlot);
router.delete('/:id', ctrl.deleteSlot);


module.exports = router;
