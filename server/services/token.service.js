var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./../config/commonConfig.js');

exports.createToken = function(user) {
	var payload = {
		email: user.email,
		id: user.id,
		iat: moment().unix(),
		exp: moment().add(24, 'hours').unix()
	};

	return jwt.encode(payload, config.TOKEN_SECRET);
};

exports.readTokken = function(token) {
	var tokenDecoded = jwt.decode(token, config.TOKEN_SECRET);

	var userData = {
		email: tokenDecoded.email,
		id: tokenDecoded.id
	};
	return userData;
};
