const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/satelliteDataValue.controller');

router.post('/satelliteDataValue', ctrl.createSatelliteDataValue);
router.get('/satelliteDataValue/:id', ctrl.getSatelliteDataValue);

module.exports = router;
