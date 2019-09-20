const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/satelliteApi.controller');

router.get('/dataset/*/dates*', ctrl.getStartAndEndDate);
router.get('/dataset/*', ctrl.handleDatasetCall);
router.get('/layer/*/dates*', ctrl.getStartAndEndDate);
router.get('/layer/*', ctrl.handleLayerCall);
router.get('/createMap', ctrl.generateMap);
router.get('/getmap/:image', ctrl.getMap);

module.exports = router;
