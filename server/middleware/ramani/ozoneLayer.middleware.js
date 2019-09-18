addLayerId = function(req, res, next) {
	req.layerId = 'ddl.simS5seriesHisAirQualityEuroExp.o3';
	req.startDate = '2006-07-01T00:00:00.000Z';
	req.endDate = '2006-07-31T00:00:00.000Z';
	console.log('Layer for ozone added');
	next();
};
const express = require('express');
const router = express.Router();
router.get('*', addLayerId);
module.exports = router;
