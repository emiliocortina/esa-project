const mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
const { Schema } = mongoose;
const EventSchema = new Schema({
	user: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String, required: false },
	date: { type: DateOnly, required: true },
	time: {
		hour: { type: Number, max: 24, min: 0 },
		minuntes: { type: Number, max: 60, min: 0 },
		required: false
	},
	type: { type: String, enum: [ 'goal', 'appointment' ], required: true },
	icon: { type: String, required: false },
	timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('event', EventSchema);
