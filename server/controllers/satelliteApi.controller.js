const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const SatelliteRequestDto = require('./../models/rawSatelliteDataRequestObject').SatelliteRequestDto;
const errorServ = require('../services/error.service');
const ramani = require('ramani');
const https = require('https');
const date = require('date-and-time');
var fs = require('fs');
request = require('request');
var randomId = require('random-id');
var path = require('path');
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

<<<<<<< HEAD
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
=======
exports.generateMap = async (req, res, next) => {
	const len = 30;
	const pattern = 'aA0';

	const id = randomId(len, pattern);

	var download = function(uri, filename, callback) {
		request.head(uri, function(err, res, body) {
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		});
	};

	let centerLongitude = parseFloat(req.query.longitude);
	let centerLatitude = parseFloat(req.query.latitude);
	let endDate = new Date();
	let startDate = date.addDays(endDate, -8);

	let bboxString = `${centerLongitude - 0.2},${centerLatitude - 0.07},${centerLongitude + 0.2},${centerLatitude +
		0.07}`;
	try {
		download(
			`https://ramani.ujuizi.com/cloud/getimage?token=bun99q5ti8js3m7aptmnckcrg4&user=emiliocortina2&WIDTH=540&HEIGHT=304&BBOX=${bboxString}&FILENAME=image.tiff&TIME=${startDate.toISOString()}/${endDate.toISOString()}/P1D&cloudinnes=80&FORMAT=image/png`,
			`./images/satellite/optic/${id}.png`,
			function() {
				let pathResolved = path.resolve(__dirname, `../images/satellite/optic/${id}.png`);
				res.setHeader('attachment', `${id}.png`);
				res.sendFile(pathResolved);
				return;
			}
		);
	} catch (err) {
		next(
			errorServ.buildError(
				req.url,
				HttpStatus.BAD_REQUEST,
				'bad_data',
				'Error obtaining the map for the location'
			)
		);
		return;
	}
};
exports.getMap = async (req, res, next) => {
	let id = req.params.image;
	let pathResolved = path.resolve(__dirname, `../images/satellite/optic/${id}`);
	res.sendFile(pathResolved, null, function(err) {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'map_not_found', "The map doesn't exist"));
		return;
	});
	return;
>>>>>>> 7b181b080493edc80fd086c4a4bab358ef5689e2
};
