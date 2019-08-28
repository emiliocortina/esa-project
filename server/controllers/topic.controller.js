const topicController = {};
const Topic = require('./../models/Topic');
const HttpStatus = require('./../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const salt = 10;

const errorServ = require('./../services/error.service');

exports.createTopic = async (req, res, next) => {
	let topic = new Topic(req.body);
	const user = tokenServ.readTokken(req.token).email;
	topic.user = user;
	topic
		.save()
		.then(() => {
			res.status(HttpStatus.CREATED).json({
				message: 'Topic created'
			});
			return;
		})
		.catch((err) => {
			next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'Incorrect data'));
			return;
		});
};
