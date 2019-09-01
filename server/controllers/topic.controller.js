const topicController = {};
const Topic = require('./../models/Topic');
const HttpStatus = require('./../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const sortAndFilterService = require('./../services/SortAndFilter.service');
const PaginationModule = require('./../models/PaginationModel');
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

exports.findTopicsPaginatedByDateDescending = async (req, res, next) => {
	const sortAndFilterInfo = sortAndFilterService.parseHeader(req.query);

	var key = sortAndFilterInfo.sortFields[0].key;
	var order = sortAndFilterInfo.sortFields[0].order == PaginationModule.ASC ? 1 : -1;

	const sort = {};
	sort[key] = order;

	const topics = await Topic.find()
		.sort(sort)
		.skip((sortAndFilterInfo.page_number - 1) * sortAndFilterInfo.page_elements)
		.limit(sortAndFilterInfo.page_elements)
		.catch(() => {
			next(
				errorServ.buildError(
					req.url,
					HttpStatus.BAD_REQUEST,
					'bad_data',
					'Bad data for the filter'
				)
			);
			return;
		});

	res.status(HttpStatus.CREATED).json(topics);
	return;
};
