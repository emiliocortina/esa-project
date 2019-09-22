const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const SatelliteData = require('../models/SatelliteData').SatelliteData;
const errorServ = require('../services/error.service');

exports.createSatelliteData = async (req, res, next) => {
	let satData = new SatelliteData(req.body);
	satData
		.save()
		.then(() => {
			res.status(HttpStatus.CREATED).json({
				message: 'SatelliteData created',
				id: satData.id
			});
			return;
		})
		.catch((err) => {
			console.log(err)
			next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'bad data'));
			return;
		});
};
exports.getSatelliteData = async (req, res, next) => {
	const id = req.params.id;
	let satData = await SatelliteData.findById(id).populate('satelliteDataValues');

	if (satData) {
		res.status(HttpStatus.OK).json(satData);
		return;
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'not_found', 'Not satellite data found'));
		return;
	}
};
