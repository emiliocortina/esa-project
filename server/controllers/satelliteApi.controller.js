const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const SatelliteRequestDto = require('./../models/rawSatelliteDataRequestObject').SatelliteRequestDto;
const errorServ = require('../services/error.service');

exports.getRawDataFromSatelliteApi = async (req, res, next) => {
	let satRequestDto = SatelliteRequestDto.parseRequest(req.query);
	console.log(req.query);
	//TODO llamada de verdad
	let satResponseDto = [
		{
			unit: 'L/m2',
			dataPack: [
				{ x: 0, y: 0.2 },
				{ x: 1, y: 0.3 },
				{ x: 2, y: 0.4 },
				{ x: 3, y: 0.5 },
				{ x: 4, y: 0.1 },
				{ x: 5, y: 0.2 },
				{ x: 6, y: 0.3 },
				{ x: 7, y: 0.4 },
				{ x: 8, y: 0.5 },
				{ x: 9, y: 0.6 }
			]
		},
		{
			unit: 'mg/cm3',
			dataPack: [
				{ x: 0, y: 0.2 },
				{ x: 1, y: 0.3 },
				{ x: 2, y: 0.4 },
				{ x: 3, y: 0.5 },
				{ x: 4, y: 0.1 },
				{ x: 5, y: 0.2 },
				{ x: 6, y: 0.3 },
				{ x: 7, y: 0.4 },
				{ x: 8, y: 0.5 },
				{ x: 9, y: 0.6 }
			]
		},
		{
			unit: 'ºC',
			dataPack: [
				{ x: 0, y: 0.2 },
				{ x: 1, y: 0.3 },
				{ x: 2, y: 0.4 },
				{ x: 3, y: 0.5 },
				{ x: 4, y: 0.1 },
				{ x: 5, y: 0.2 },
				{ x: 6, y: 0.3 },
				{ x: 7, y: 0.4 },
				{ x: 8, y: 0.5 },
				{ x: 9, y: 0.6 }
			]
		}
	];

	res.status(HttpStatus.OK).json(satResponseDto);
	return;
};
