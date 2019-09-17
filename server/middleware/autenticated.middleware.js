var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/commonConfig');
var errorServ = require('./../services/error.service');

ensureAuthenticated = function(req, res, next) {
	if (!req.token) {
		next(errorServ.buildError(req.url, 403, 'auth_error', 'No authetication'));
		return;
	}

	var token = req.token;
	try {
		var payload = jwt.decode(token, config.TOKEN_SECRET);
	} catch (err) {
		next(errorServ.buildError(req.url, 401, 'auth_error', 'Invalid token'));
		return;
	}

	if (payload.exp <= moment().unix()) {
		next(errorServ.buildError(req.url, 401, 'token_expirated', 'Token has expirated'));
		return;
	}

	req.user = payload.sub;

	next();
};
const express = require('express');
const router = express.Router();
router.post('/*', ensureAuthenticated);
router.get('/*', ensureAuthenticated);
router.put('/*', ensureAuthenticated);
router.delete('/*', ensureAuthenticated);
router.patch('/*', ensureAuthenticated);

module.exports = router;
