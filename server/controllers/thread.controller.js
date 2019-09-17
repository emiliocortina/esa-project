const Thread = require('../models/Thread');


const HttpStatus = require('../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const sortAndFilterService = require('../services/SortAndFilter.service');
const PaginationModule = require('../models/PaginationModel');

const errorServ = require('../services/error.service');

exports.createThread = async (req, res, next) => {
	let thread = new Thread(req.body);

	const user = tokenServ.readTokken(req.token).id;

	thread.author = user;

	thread.save().then(() => {
		res.status(HttpStatus.CREATED).json({
			message: 'Thread created',
			id: thread.id
		});
		return;
	});
};

exports.findThreadById = async (req, res, next) => {
	const id = req.params.id;
	var thread = await Thread.findById(id).populate('head');
	if (thread) {
		res.status(HttpStatus.OK).json(thread);
		return;
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'thread_not_found', 'The thread doesnt exist'));
		return;
	}
};

exports.modifyThread = async (req, res, next) => {
	const id = req.params.id;
	const user = tokenServ.readTokken(req.token).id;
	let thread = await Thread.findById(id);
	if (thread) {
		if (thread.author !== user) {
			next(
				errorServ.buildError(
					req.url,
					HttpStatus.UNAUTHORIZED,
					'not_owner',
					'You have to be the owner to modify the thread'
				)
			);
			return;
		}
		const updateFields = req.body;

		Thread.findByIdAndUpdate(id, updateFields)
			.then(() => {
				res.status(HttpStatus.CREATED).json({
					message: 'Thread updated'
				});
				return;
			})
			.catch(() => {
				next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'Incorrect data'));
				return;
			});
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'thread_not_found', 'The thread doesnt exist'));
		return;
	}
};

exports.deleteThread = async (req, res, next) => {
	const id = req.params.id;
	const user = tokenServ.readTokken(req.token).id;
	let thread = await Thread.findById(id);
	if (thread) {
		if (thread.author !== user) {
			next(
				errorServ.buildError(
					req.url,
					HttpStatus.UNAUTHORIZED,
					'not_owner',
					'You have to be the owner to delete the thread'
				)
			);
			return;
		}

		Thread.findByIdAndDelete(id)
			.then(() => {
				res.status(HttpStatus.CREATED).json({
					message: 'Thread deleted'
				});
				return;
			})
			.catch(() => {
				next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'Incorrect data'));
				return;
			});
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'thread_not_found', 'The thread doesnt exist'));
		return;
	}
};

exports.findThreadsPaginatedByDateDescending = async (req, res, next) => {
	const sortAndFilterInfo = sortAndFilterService.parseHeader(req.query);

	var key = sortAndFilterInfo.sortFields[0].key;
	var order = sortAndFilterInfo.sortFields[0].order == PaginationModule.ASC ? 1 : -1;

	const sort = {};
	sort[key] = order;

	const threads = await Thread.find()
		.sort(sort)
		.skip((sortAndFilterInfo.page_number - 1) * sortAndFilterInfo.page_elements)
		.limit(sortAndFilterInfo.page_elements)
		.exec()
		.catch(() => {
			next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'Bad data for the filter'));
			return;
		});

	res.status(HttpStatus.CREATED).json(threads);
	return;
};
