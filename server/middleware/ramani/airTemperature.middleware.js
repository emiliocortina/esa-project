const ramani = require('ramani');
addLayerId = function (req, res, next) {
	req.ramaniLayerId = 'air_temperature_2m';
	req.ramaniDataset = 'https://analytics.ramani.ujuizi.com/goto/ad5264c63c4bf97e4bf8d68e010b3b24';

	// ramani.getMetadata('air_temperature_2m', { item: 'dates', dataset: req.ramaniDataset }, function(error, result) {
	// 	//console.log(error);
	// 	//console.log(result);

	// });
	req.ramaniMinimunStartTime = new Date('2001-01-05T00:00:00.000Z');
	req.ramaniMaximunEndTime = new Date('2003-03-02T00:00:00.000Z');

	req.ramaniLayerParams = [];
	req.ramaniValueUnit = 'Kelvin';

	next();
};
const express = require('express');
const router = express.Router();
router.get('*', addLayerId);
module.exports = router;
