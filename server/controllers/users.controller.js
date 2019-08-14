const usersCtrl = {};
const Model = require('./../models/user');
const bcrypt = require('bcrypt');
const salt = 10;
const tokkenServ = require('../services/token.service');

usersCtrl.signup = async (req, res) => {
	const user = new Model(req.body);
	user.unencodedPass=user.password;
	let existentUser = await Model.findOne({ email:user.email });
	
	if (existentUser) {
		res.status(400).json({error:"Already existing email",code:1})
		return;
	}

	existentUser = await Model.findOne({ nickName: user.nickName });
	if (existentUser) {
		res.status(400).json({error:"Already existing nick name",code:1})
		return;
	}

	console.log('Body ' + user);
	bcrypt.hash(user.unencodedPass, salt, function(err, hash) {
		if (err) {
			console.log('err: '+err);
			res.status(400).json({error:"Bad register",code:2})
			return;
		}
		user.password = hash;
		user.unencodedPass = null;
		user.save((err, doc) => {
			if (err) {
				console.log('err: '+err);
				res.status(400).json({error:"Bad register",code:3})
				return;
			}
			res.status(201).json({
				message: 'user created, logged in',
				token: tokkenServ.createToken(user.email),
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

usersCtrl.login = async (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	
	const user = await Model.findOne({ email: email });
	if (user) {
		bcrypt.compare(password, user.password, (err, exist) => {
			if (exist) {
				res.json({
					status: 'logged in',
					token: tokkenServ.createToken(email),
					user: {
						email: email,
						name: user.name,
						nickName: user.nickName,
						avatarId: user.avatarId
					}
				});

				return;
			} else {
				res.status(401).json({ error: 'Incorrect user or password.' });

				return;
			}
		});
	} else {
		console.log("aqui")
		res.status(401).json({ error: 'Incorrect user or password.' });
		return;
	}
};

usersCtrl.logout = async (req, res) => {};

module.exports = usersCtrl;
