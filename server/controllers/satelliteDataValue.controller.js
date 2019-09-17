const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const SatelliteDataValue = require('../models/SatelliteData').SatelliteDataValue;
const errorServ = require('../services/error.service');

exports.createSatelliteDataValue = async (req, res, next) => {
	let satData = new SatelliteDataValue(req.body);
	satData
		.save()
		.then(() => {
			res.status(HttpStatus.CREATED).json({
				message: 'SatelliteDataValue created',
				id: satData.id
			});
			return;
		})
		.catch((err) => {
			next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'bad data'));
			return;
		});
};
exports.getSatelliteDataValue = async (req, res, next) => {
	const id = req.params.id;
	let satData = await SatelliteDataValue.findById(id);

	if (satData) {
		res.status(HttpStatus.OK).json(satData);
		return;
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'not_found', 'Not satellite data value found'));
		return;
	}
};
