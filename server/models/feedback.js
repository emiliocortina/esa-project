const mongoose = require('mongoose');

const { Schema } = mongoose;
const FeedbackSchema = new Schema({
	message: { type: String, required: true },

	timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('feedback', FeedbackSchema);
