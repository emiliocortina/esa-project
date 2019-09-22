const mongoose = require('mongoose');
const { Schema } = mongoose;

let SatelliteDataSchema = new Schema({
	start: { type: Date, require: true },
	end: { type: Date, required: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
	annotations: [
		{
			x: { type: Number, required: true },
			y: { type: Number, required: true },
			text: { type: String, required: true }
		}
	],
	satelliteDataValues: [ { type: Schema.Types.ObjectId, ref: 'satelliteDataValue' } ]
});

let SatelliteDataValue = new Schema({
	leastSquares: { type: String, required: true },
	dataCategory: {
		unit: { type: String, required: true },
		threadCategory: { type: String, required: true }
	}
});
module.exports = module.exports = {
	SatelliteData: mongoose.model('satelliteData', SatelliteDataSchema),
	SatelliteDataValue: mongoose.model('satelliteDataValue', SatelliteDataValue)
};
