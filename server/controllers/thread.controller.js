const Thread = require('../models/Thread');
const User = require('../models/user');

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

exports.findThreadsPaginated = async (req, res, next) => {
    const sortAndFilterInfo = sortAndFilterService.parseHeader(req.query);

    const sort = {};
    if (sortAndFilterInfo.sortFields[0]) {
        var key = sortAndFilterInfo.sortFields[0].key;
        var order = sortAndFilterInfo.sortFields[0].order == PaginationModule.ASC ? 1 : -1;
        sort[key] = order;
    }

    let filter = {};
    if (sortAndFilterInfo.filterFields) {
        filter = sortAndFilterInfo.filterFields;
    }

    const threads = await Thread.find(filter)
        .sort(sort)
        .skip((sortAndFilterInfo.page_number - 1) * sortAndFilterInfo.page_elements)
        .limit(sortAndFilterInfo.page_elements)
        .exec()
        .then(
            (threads) => {
                res.status(HttpStatus.CREATED).json(threads);
                return;
            },
            (err) => {
                next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'Bad data for the filter'));
                return;
            }
        );
};


exports.findThreadsPaginatedByAuthorEmail = async (req, res, next) => {
    const userEmail = req.query.email;

    if (userEmail) {
        const user = await User.findOne({ email: userEmail }).exec();
        if (user) {
            const sortAndFilterInfo = sortAndFilterService.parseHeader(req.query);

            const sort = {};
            if (sortAndFilterInfo.sortFields[0]) {
                var key = sortAndFilterInfo.sortFields[0].key;
                var order = sortAndFilterInfo.sortFields[0].order == PaginationModule.ASC ? 1 : -1;
                sort[key] = order;
            }

            const userId = user.id;

            const threads = await Thread.find({ author: userId })
                .sort(sort)
                .skip((sortAndFilterInfo.page_number - 1) * sortAndFilterInfo.page_elements)
                .limit(sortAndFilterInfo.page_elements)
                .exec()
                .then(
                    (threads) => {
                        res.status(HttpStatus.CREATED).json(threads);
                        return;
                    },
                    (err) => {
                        next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'Bad data for the filter'));
                        return;
                    }
                );
        }
    } else {
        next(errorServ.buildError(req.url, HttpStatus.BAD_REQUEST, 'bad_data', 'No email specified'));
        return;
    }
}
