const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const SatelliteRequestDto = require('./../models/rawSatelliteDataRequestObject').SatelliteRequestDto;
const errorServ = require('../services/error.service');
const ramani = require('ramani');

exports.handleDatasetCall = async (req, res, next) => {
	console.log('Ha llegado a dataset');
	return;
};

exports.handleLayerCall = async (req, res, next) => {
	console.log(`Ha llegado a layer for layer [ ${req.layerId}]`);
	let satRequestDto = SatelliteRequestDto.parseRequest(req.query);
	var layerobj = [];
	layerobj.push({
		point: [ satRequestDto.latitude, satRequestDto.longitude ],
		layers: [ req.layerId ],
		params: {
			ELEVATION: 1,
			TIME: `${req.startDate}/${req.endDate}`
		}
	});
	//console.log(layerobj);
	ramani.getPointProfile(layerobj, function(err, ret) {
		if (err) {
			next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'no_data', 'No data for this params'));
			return;
		}
		ret.data.forEach(function(obj) {
			let dataObject = obj.value.features[0].featureInfo;
			//console.log(dataObject);
			let firstDate = Date.parse(dataObject[0].time);
			let lastDate = Date.parse(dataObject[dataObject.length - 1].time);
			let datapack = dataObject.map((value) => {
				console.log(`Processing ${value}`);
				let dateInCeroOne = (Date.parse(value.time) - firstDate) / (lastDate - firstDate);

				let pointObject = { x: dateInCeroOne, y: value.value };
				return pointObject;
			});

			let satResponseDto = [
				{
					unit: 'Kg/mol',
					dataPack: datapack
				}
			];
			res.status(HttpStatus.OK).json(satResponseDto);
			return;
		});
	});

	return;
};
