var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./../config/commonConfig.js');

exports.createToken = function(email) {
	var payload = {
		sub: email,
		iat: moment().unix(),
		exp: moment().add(24, 'hours').unix()
	};

	return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.readTokken = function(token) {
	var tokenDecoded = jwt.decode(token, config.TOKEN_SECRET);

	var userData = {
		email: tokenDecoded.sub
	};
	return userData;
};
