var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config/commonConfig');

ensureAuthenticated = function(req, res, next) {

	if (!req.headers.token) {
		return res.status(403).send({ error: 'No authentication' });
	}

	var token = req.headers.token;
	try {
		var payload = jwt.decode(token, config.TOKEN_SECRET);
	} catch (err) {
		return res.status(401).send({ error: 'Invalid tokken' });
	}

	if (payload.exp <= moment().unix()) {
		return res.status(401).send({ error: 'Token expirated' });
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
