const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const SatelliteRequestDto = require('./../models/rawSatelliteDataRequestObject').SatelliteRequestDto;
const errorServ = require('../services/error.service');
const ramani = require('ramani');

exports.handleDatasetCall = async (req, res, next) => {
	let url = 'https://analytics.ramani.ujuizi.com/goto/ad5264c63c4bf97e4bf8d68e010b3b24';
	var layerobj = [];
	layerobj.push({
		point: [ 52.338, 6.332 ],
		layers: [ 'air_temperature_2m' ],
		dataset: url,
		params: {
			//TIME: '2010-11-29T00%3A00%3A00.000Z'
		}
	});
	var getPointProfile = ramani.getPoint(
		[ 6.332, 52.338 ],
		{
			layer: 'air_temperature_2m',
			dataset: url,
			info_format: 'text/json'
		},
		function(err, ret) {
			console.log(err);
			console.log(ret);

			res.json(ret);
			return;
		}
	);
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
		console.log(err);
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
	if (req.ramaniDataset) {
		layerobj[0].dataset = req.ramaniDataset;
	}

	//results

	console.log(layerobj);
	ramani.getPointProfile(layerobj, function(err, ret) {
		if (err) {
			//error handling

			next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'no_data', 'No data for this params'));
			return;
		}
		ret.data.forEach(function(obj) {
			//process results
			if (!obj.value) {
				//console.log(obj);
				res.json(obj);
				return;
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
