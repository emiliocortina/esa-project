const TopicModule = require('./../models/Topic').;
const Comment = TopicModule.CommentSchema;
const HttpStatus = require('./../constants/HttpStatus');
const tokenServ = require('../services/token.service');
const sortAndFilterService = require('./../services/SortAndFilter.service');
const PaginationModule = require('./../models/PaginationModel').;
const salt = 10;

const errorServ = require('./../services/error.service');
