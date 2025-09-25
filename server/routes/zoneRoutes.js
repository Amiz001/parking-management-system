// server/routes/zoneRoutes.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/zoneController');


router.get('/', ctrl.getAllZones);
router.post('/', ctrl.addZone);
router.get('/:id', ctrl.getZoneById);
router.put('/:id', ctrl.updateZone);
router.delete('/:id', ctrl.deleteZone);
router.get('/next/:parkType', ctrl.getNextZoneDetails); // New route to get next zone details



module.exports = router;
