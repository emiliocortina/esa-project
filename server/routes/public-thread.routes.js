const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/thread.controller');
const ctrlSatelliteData= require('../controllers/satelliteData.controller')
const ctrlSatelliteDataValues= require('../controllers/satelliteDataValue.controller')

router.get('/thread/:id', ctrl.findThreadById);
router.get('/threadsByDate', ctrl.findThreadsPaginated);
router.get('/threadsByAuthorEmail', ctrl.findThreadsPaginatedByAuthorEmail);
router.get('/satelliteData/:id', ctrlSatelliteData.getSatelliteData);
router.get('/satelliteDataValue/:id', ctrlSatelliteDataValues.getSatelliteDataValue);

module.exports = router;
