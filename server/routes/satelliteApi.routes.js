const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/satelliteApi.controller');

//router.post('/satelliteApi', ctrl.createSatelliteData);
router.get('/satelliteApi', ctrl.getRawDataFromSatelliteApi);

module.exports = router;
