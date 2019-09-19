addLayerId = function(req, res, next) {
	req.ramaniLayerId = 'ddl.simS5seriesHisAirQualityEuroExp.o3';
	req.ramaniMinimunStartTime = new Date('2006-07-01T00:00:00.000Z');
	req.ramaniMaximunEndTime = new Date('2006-07-31T00:00:00.000Z');
	req.ramaniLayerParams = [ { key: 'elevation', value: 1 } ];
	req.ramaniValueUnit = 'Kg/mol';
	next();
};
const express = require('express');
const router = express.Router();
router.get('*', addLayerId);
module.exports = router;
