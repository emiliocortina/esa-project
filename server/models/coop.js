const mongoose = require('mongoose');

const { Schema } = mongoose;
const CoopSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
	data: [ { type: Schema.Types.ObjectId, ref: 'satelliteData', required: false } ],
	timestamp: { type: Date, default: Date.now },
	text: { type: String, required: false },
	likes: [ { type: Schema.Types.ObjectId, ref: 'user' } ],
	children: [ { type: Schema.Types.ObjectId, ref: 'coop' } ]
});
module.exports = mongoose.model('coop', CoopSchema);
