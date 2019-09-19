const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const SatelliteRequestDto = require('./../models/rawSatelliteDataRequestObject').SatelliteRequestDto;
const errorServ = require('../services/error.service');
const ramani = require('ramani');

exports.handleDatasetCall = async (req, res, next) => {
	res.json({ message: 'Handle dataset call' });
	return;
};

exports.getStartAndEndDate = async (req, res, next) => {
	console.log('hey');
	let minimunStartTime = req.ramaniMinimunStartTime;
	let maximunEndTime = req.ramaniMaximunEndTime;

	res.status(HttpStatus.OK).json({ start: minimunStartTime, end: maximunEndTime });
	return;
};

exports.handleLayerCall = async (req, res, next) => {
	let satRequestDto = SatelliteRequestDto.parseRequest(req.query);
	let time = {};
	try {
		let minimunStartTime = req.ramaniMinimunStartTime;
		let maximunEndTime = req.ramaniMaximunEndTime;

		//Comprobaciones de TIME

		if (satRequestDto.end == null) {
			let parsedDate = new Date(satRequestDto.start);
			if (parsedDate.getTime() < minimunStartTime.getTime() || parsedDate.getTime() > maximunEndTime.getTime()) {
				next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'no_data', 'No data available on that time'));
				return;
			} else {
				//Todo bien
				time['formalized'] = parsedDate.toISOString();
				time['raw'] = [ parsedDate ];
			}
		} else {
			let parsedStart = new Date(satRequestDto.start);
			let parsedEnd = new Date(satRequestDto.end);

			if (parsedStart.getTime() < minimunStartTime.getTime()) {
				parsedStart = new Date(minimunStartTime);
			}

			if (parsedEnd.getTime() > maximunEndTime.getTime()) {
				parsedEnd = new Date(maximunEndTime);
			}

			if (parsedStart.getTime() > maximunEndTime.getTime() || parsedEnd.getTime() < minimunStartTime.getTime()) {
				next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'no_data', 'No data available on that time'));
				return;
			}

			time['formalized'] = `${parsedStart.toISOString()}/${parsedEnd.toISOString()}`;
			time['raw'] = [ parsedStart, parsedEnd ];
		}
	} catch (err) {
		//console.log(err);
		next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'date format incorrect'));
		return;
	}
	let ramaniLayerParams = req.ramaniLayerParams;
	let params = { TIME: time.formalized };
	if (ramaniLayerParams) {
		ramaniLayerParams.forEach((param) => {
			params[param.key] = param.value;
		});
	}
	var layerobj = [
		{
			point: [ satRequestDto.latitude, satRequestDto.longitude ],
			layers: [ req.ramaniLayerId ],
			params: params
		}
	];

	//results

	ramani.getPointProfile(layerobj, function(err, ret) {
		if (err) {
			//error handling

			next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'no_data', 'No data for this params'));
			return;
		}
		ret.data.forEach(function(obj) {
			//process results
			if (!obj.value) {
				next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'no_data', 'No data for this params'));
				return;
			}

			let dataObject = obj.value.features[0].featureInfo;

			let firstDate = Date.parse(dataObject[0].time);
			let lastDate = Date.parse(dataObject[dataObject.length - 1].time);
			let datapack = dataObject.map((value) => {
				let dateInCeroOne = (Date.parse(value.time) - firstDate) / (lastDate - firstDate);

				let pointObject = { x: dateInCeroOne, y: value.value };
				return pointObject;
			});

			let satResponseDto = [
				{
					unit: req.ramaniValueUnit,
					dates: time.raw,
					dataPack: datapack
				}
			];
			res.status(HttpStatus.OK).json(satResponseDto);
			return;
		});
	});

	return;
};
