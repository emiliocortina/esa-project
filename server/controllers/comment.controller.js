const TopicModule = require('../models/Thread');
const Comment = TopicModule.CommentSchema;
const Topic = TopicModule.TopicSchema;
const HttpStatus = require('./../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const sortAndFilterService = require('./../services/SortAndFilter.service');
const PaginationModule = require('./../models/PaginationModel');
const mongoose = require('mongoose');
const salt = 10;

const errorServ = require('./../services/error.service');

exports.commentOnTopic = async (req, res, next) => {
	const topicId = req.params.id;

	let topic = await Topic.findById(topicId).catch(() => {
		//next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'BAD_DATA', 'Bad id'));
		return;
	});

	if (topic) {
		let comment = new Comment(req.body);
		comment.user = tokenServ.readTokken(req.token).email;
		//comment._id = new mongoose.Types.ObjectId();
		comment
			.save()
			.then(() => {
				topic.comments.push(comment._id);
				topic
					.save()
					.then(() => {
						res.status(HttpStatus.CREATED).json({ message: 'Comment added to topic' });
						return;
					})
					.catch((err) => {
						next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'BAD_DATA', 'Bad data'));
						return;
					});
			})
			.catch(() => {
				next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'BAD_DATA', 'Bad data'));
				return;
			});
	} else {
		next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'BAD_DATA', "The topic doesn't exit"));
		return;
	}
};
exports.answerToComment = async (req, res, next) => {
	const commentId = req.params.id;

	let comment = await Comment.findById(commentId).catch(() => {
		//next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'BAD_DATA', 'Bad id'));
		return;
	});

	if (comment) {
		let answer = new Comment(req.body);
		answer.user = tokenServ.readTokken(req.token).email;
		answer
			.save()
			.catch(() => {
				return;
			})
			.then(() => {
				comment.answers.push(answer._id);

				comment
					.save()
					.then(() => {
						res.status(HttpStatus.CREATED).json({ message: 'Comment added to comment' });
						return;
					})
					.catch((err) => {
						next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'BAD_DATA', 'BAD DATA'));
						return;
					});
			});
	} else {
		next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'BAD_DATA', "The comment doesn't exit"));
		return;
	}
};
exports.getComment = async (req, res, next) => {
	const commentId = req.params.id;

	var comment = await Comment.findById(commentId).populate('answers').exec();
	if (comment) {
		res.status(HttpStatus.OK).json(comment);
		return;
	} else {
		next(errorServ.buildError(req.url, HttpStatus.NOT_FOUND, 'topic_not_found', 'The topic doesnt exist'));
		return;
	}
};
exports.deleteComment = async (req, res, next) => {
	//TODO sera un borrado logico?, si no que hacemos con sus respuestas?
	return next(
		errorServ.buildError(
			req.url,
			HttpStatus.INTERNAL_SERVER_ERROR,
			'NOT_IMPLEMENTED',
			'The method is not implemented yet'
		)
	);
};
