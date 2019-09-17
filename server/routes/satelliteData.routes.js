const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/satelliteData.controller');

router.post('/satelliteData', ctrl.createSatelliteData);
router.get('/satelliteData/:id', ctrl.getSatelliteData);

module.exports = router;
