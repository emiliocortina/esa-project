const usersCtrl = {};
const Model = require('./../models/user');
const bcrypt = require('bcrypt');
const salt = 10;
const tokkenServ = require('../services/token.service');

usersCtrl.signup = async (req, res) => {
	const user = new Model(req.body);
	user.unencodedPass=user.password;
	//console.log(user)
	const existentUser = await Model.findOne({ email:user.email });
	
	if (existentUser) {
		res.status(400).json({error:"Already existing email",code:1})
		return;
	}
	bcrypt.hash(user.unencodedPass, salt, function(err, hash) {
		if (err) {
			
			res.status(400).json({error:"Bad register",code:2})
			return;
		}
		user.password = hash;
		user.unencodedPass = null;
		user.save((err, doc) => {
			if (err) {
			
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
						surname: user.surname
					}
				});

				return;
			} else {
				res.status(401).json({ error: 'Login error' });

				return;
			}
		});
	} else {
		console.log("aqui")
		res.status(401).json({ error: 'Login error' });
		return;
	}
};

usersCtrl.logout = async (req, res) => {};

module.exports = usersCtrl;
