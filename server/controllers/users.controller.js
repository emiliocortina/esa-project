const usersCtrl = {};
const Model = require('./../models/user');
const bcrypt = require('bcrypt');
const salt = 10;
const tokenServ = require('../services/token.service');
const errorServ = require('./../services/error.service');
usersCtrl.signup = async (req, res, next) => {
	const user = new Model(req.body);
	user.unencodedPass = user.password;
	let existentUser = await Model.findOne({ email: user.email });

	if (existentUser) {
		next(errorServ.buildError(req.url, 400, 'email_repeated', 'Already existing email'));
		return;
	}

	existentUser = await Model.findOne({ nickName: user.nickName });
	if (existentUser) {
		next(errorServ.buildError(req.url, 400, 'nick_repeated', 'Already existing nick name'));
		return;
	}

	bcrypt.hash(user.unencodedPass, salt, function(err, hash) {
		if (err) {
			next(errorServ.buildError(req.url, 400, 'bad_register', 'Server error'));
			return;
		}
		user.password = hash;
		user.unencodedPass = null;
		user.save((err, doc) => {
			if (err) {
				

				next(errorServ.buildError(req.url, 400, 'bad_register', 'Server error'));
				return;
			}
			res.status(201).json({
				message: 'user created, logged in',
				token: tokenServ.createToken(user),
				code: 0,
				user: {
					email: user.email,
					name: user.name,
					surname: user.surname
				}
			}); //ok
			return;
		});
	});
};

usersCtrl.login = async (req, res, next) => {
	var email = req.body.email;
	var password = req.body.password;

	const user = await Model.findOne({ email: email });
	if (user) {
		bcrypt.compare(password, user.password, (err, exist) => {
			if (exist) {
				res.json({
					status: 'logged in',
					token: tokenServ.createToken(user),
					user: {
						email: email,
						name: user.name,
						nickName: user.nickName,
						avatarId: user.avatarId
					}
				});

				return;
			} else {
				next(errorServ.buildError(req.url, 401, 'bad_register', 'Credentials error'));
				return;
			}
		});
	} else {
		next(errorServ.buildError(req.url, 401, 'bad_register', 'Credentials error'));
		return;
	}
};

usersCtrl.logout = async (req, res) => {};

module.exports = usersCtrl;
