const eventsCtrl = {};
const Model = require('./../models/Event');
const bcrypt = require('bcrypt');
const salt = 10;
const tokenServ = require('../services/token.service');

eventsCtrl.getEventById = async (req, res) => {
	var id = req.params.id;

	if (typeof id == 'undefined') {
		res.status(400).json({ error: 'No id provided' });
		return;
	}

	var userData = tokenServ.readTokken(req.headers.token);
	var event = await Model.findById(id);

	if (!event) {
		res.status(404).json({ error: 'Non existing resource' });
		return;
	}

	if (event.user !== userData.email) {
		res.status(403).json({ error: "You don't have access to this resource" });
		return;
	} else {
		res.status(200).json(event);
		return;
	}
};
eventsCtrl.createEvent = async (req, res) => {
	const event = new Model(req.body);

	event.user = tokenServ.readTokken(req.headers.token).email;
	event.save((err, doc) => {
		if (err) {
			res.status(400).json({ error: 'Bad request' });
			return;
		}
		res.status(201).json({
			message: 'event created'
		}); //ok
		return;
	});
};
eventsCtrl.deleteEvent = async (req, res) => {
	var userData = tokenServ.readTokken(req.headers.token);
	var id = req.params.id;
	var event = await Model.findById(id);
	if (!event) {
		res.status(404).json({ error: 'Non existing resource' });
		return;
	}

	if (event.user !== userData.email) {
		res.status(403).json({ error: "You don't have access to this resource" });
		return;
	} else {
		event.remove((err, doc) => {
			if (err) {
				res.status(400).json({ error: 'Bad request' });
				return;
			}
			res.status(200).json({
				message: 'event deleted'
			}); //ok
			return;
		});
	}
};
eventsCtrl.updateEvent = async (req, res) => {
	var userData = tokenServ.readTokken(req.headers.token);
	var id = req.params.id;
	var event = await Model.findById(id);
	if (!event) {
		res.status(404).json({ error: 'Non existing resource' });
		return;
	}

	if (event.user !== userData.email) {
		res.status(403).json({ error: "You don't have access to this resource" });
		return;
	} else {
		var updateEvent = new Model(req.body);
        console.log(updateEvent)
		console.log(Object.values(updateEvent));

		res.json({ msg: 'funciona' });

		// event.remove((err, doc) => {
		// 	if (err) {
		// 		res.status(400).json({ error: 'Bad request' });
		// 		return;
		// 	}
		// 	res.status(200).json({
		// 		message: 'event deleted'
		// 	}); //ok
		// 	return;
		// });
	}
};
eventsCtrl.getEventsInRange = async (req, res) => {};

module.exports = eventsCtrl;
