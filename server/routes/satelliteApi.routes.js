const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/satelliteApi.controller');

router.get('/dataset/*/dates*', ctrl.getStartAndEndDate);
router.get('/dataset/*', ctrl.handleDatasetCall);
router.get('/layer/*/dates*', ctrl.getStartAndEndDate);
router.get('/layer/*', ctrl.handleLayerCall);
<<<<<<< HEAD
router.get('/map', ctrl.getZoneMap);
=======
router.get('/createMap', ctrl.generateMap);
router.get('/getmap/:image', ctrl.getMap);
>>>>>>> 7b181b080493edc80fd086c4a4bab358ef5689e2

module.exports = router;
