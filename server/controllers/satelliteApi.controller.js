const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const SatelliteRequestDto = require('./../models/rawSatelliteDataRequestObject').SatelliteRequestDto;
const errorServ = require('../services/error.service');
const ramani = require('ramani');

exports.handleDatasetCall = async (req, res, next) => {
	let url = req.ramaniDataset;
	let satRequestDto = SatelliteRequestDto.parseRequest(req.query);
	let start = new Date(satRequestDto.start);
	let end = new Date(satRequestDto.end);
	ramani.getPoint(
		[ satRequestDto.latitude, satRequestDto.longitude ],
		{
			layer: req.ramaniLayerId,
			dataset: url,
			info_format: 'text/json',
			time: `${start.toISOString()}/${end.toISOString()}`
		},
		function(err, ret) {
			if (err) {
				//error handling

				next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'no_data', 'No data for this params'));
				return;
			}

			//process results
			if (!ret) {
				//console.log(obj);

				next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'no_data', 'No data for this params'));
				return;
			}

			let dataObject = ret.features[0].featureInfo;

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
					dates: { start: start, end: end },
					dataPack: datapack
				}
			];
			res.status(HttpStatus.OK).json(satResponseDto);
			return;
		}
	);

	//	ramani.getPointProfile()
};

exports.getStartAndEndDate = async (req, res, next) => {
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

exports.getZoneMap = async (req, res, next) => {
	let satRequestDto = SatelliteRequestDto.parseRequest(req.query);
	let lon = satRequestDto.longitude;
	let lat = satRequestDto.latitude;
	let halfSide = 0.03;
	ramani.getArea(
		// [
		// 	[ lon - halfSide, lat + halfSide ],
		// 	[ lon + halfSide, lat + halfSide ],
		// 	[ lon - halfSide, lat - halfSide ],
		// 	[ lon + halfSide, lat - halfSide ]
		// ],
		[
			[ 52.382305628707854, 6.25396728515625 ],
			[ 52.424196211696774, 6.372899355829467 ],
			[ 52.30345857599569, 6.257838787287611 ],
			[ 52.309025707071214, 6.638463891157568 ]
		],
		{
			layer: 'ddl.GLOBALS2TRUECOLOR',
			info_format: 'text/json',
			return: 'aggregate'
		},
		function(error, result) {
			console.log(error);
			res.json(result);
			return;
		}
	);
};
