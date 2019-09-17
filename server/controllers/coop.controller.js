const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const Coop = require('../models/coop');
const errorServ = require('../services/error.service');

exports.createCoop = async (req, res, next) => {
	let coop = new Coop(req.body);
	coop.author = tokenServ.readTokken(req.token).id;
	coop
		.save()
		.then(() => {
			res.status(HttpStatus.CREATED).json({
				message: 'Coop created',
				id: coop.id
			});
			return;
		})
		.catch((err) => {
			next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'bad data'));
			return;
		});
};
exports.getCoop = async (req, res, next) => {
	const id = req.params.id;
	let coop = await Coop.findById(id);

	if (coop) {
		res.status(HttpStatus.OK).json(coop);
		return;
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'not_found', 'Not coop found'));
		return;
	}
};
