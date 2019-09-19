addLayerId = function(req, res, next) {
	req.ramaniLayerId = 'ddl.simS4seriesNo2YearlyGlob.var';
	req.ramaniMinimunStartTime = new Date('2009-01-01T00:00:00.000Z');
	req.ramaniMaximunEndTime = new Date('2010-01-01T00:00:00.000Z');

	req.ramaniValueUnit = '10e13 molecules/cm2';
	next();
};
const express = require('express');
const router = express.Router();
router.get('*', addLayerId);
module.exports = router;
