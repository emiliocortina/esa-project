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

exports.findTopicById = async (req, res, next) => {
	const id = req.params.id;
	var topic = await Topic.findById(id);
	if (topic) {
		res.status(HttpStatus.OK).json(topic);
		return;
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'topic_not_found', 'The topic doesnt exist'));
		return;
	}
};

exports.modifyTopic = async (req, res, next) => {
	const id = req.params.id;
	const user = tokenServ.readTokken(req.token).email;
	let topic = await Topic.findById(id);
	if (topic) {
		if (topic.user !== user) {
			next(
				errorServ.buildError(
					req.url,
					HttpStatus.UNAUTHORIZED,
					'not_owner',
					'You have to be the owner to modify the topic'
				)
			);
			return;
		}
		const updateFields = req.body;
		updateFields['edited'] = true;
		Topic.findByIdAndUpdate(id, updateFields)
			.then(() => {
				res.status(HttpStatus.CREATED).json({
					message: 'Topic updated'
				});
				return;
			})
			.catch(() => {
				next(
					errorServ.buildError(
						req.url,
						HttpStatus.BAD_REQUEST,
						'bad_data',
						'Incorrect data'
					)
				);
				return;
			});
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'topic_not_found', 'The topic doesnt exist'));
		return;
	}
};

exports.deleteTopic = async (req, res, next) => {
	const id = req.params.id;
	const user = tokenServ.readTokken(req.token).email;
	let topic = await Topic.findById(id);
	if (topic) {
		if (topic.user !== user) {
			next(
				errorServ.buildError(
					req.url,
					HttpStatus.UNAUTHORIZED,
					'not_owner',
					'You have to be the owner to delete the topic'
				)
			);
			return;
		}

		Topic.findByIdAndDelete(id)
			.then(() => {
				res.status(HttpStatus.CREATED).json({
					message: 'Topic deleted'
				});
				return;
			})
			.catch(() => {
				next(
					errorServ.buildError(
						req.url,
						HttpStatus.BAD_REQUEST,
						'bad_data',
						'Incorrect data'
					)
				);
				return;
			});
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'topic_not_found', 'The topic doesnt exist'));
		return;
	}
};
