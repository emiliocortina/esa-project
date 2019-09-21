const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const Feedback = require('../models/feedback');
const errorServ = require('../services/error.service');

exports.pushFeedback = async (req, res, next) => {
	let feedback = new Feedback(req.body);
	feedback
		.save()
		.then(() => {
			res.status(HttpStatus.OK).json({ message: 'ok' });
		})
		.catch(() => {
			next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'Bad data'));
			return;
		});
};

exports.retrieveFeeback = async (req, res, next) => {
	let user = req.body.user;
	let password = req.body.password;

	if (user && password) {
		if (user === 'cooperAdmin' && password === 'peZ_3spada') {
			let feedback = await Feedback.find();
			res.send(feedback);
		} else {
			res.status(HttpStatus.FORBIDDEN).json({ message: 'Do tou really think we are retarded?' });
			return;
		}
	} else {
		res.status(HttpStatus.FORBIDDEN).json({ message: 'Do tou really think we are retarded?' });
		return;
	}
};
