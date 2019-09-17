const mongoose = require('mongoose');
const { Schema } = mongoose;

let SatelliteDataSchema = new Schema({
	start: { type: Date, require: true },
	end: { type: Date, required: true },
	annotations: [
		{
			x: { type: Number, required: true },
			y: { type: Number, required: true },
			text: { type: String, required: true }
		}
	]
});
module.exports = mongoose.model('satelliteData', SatelliteDataSchema);
