const mongoose = require('mongoose');
const { Schema } = mongoose;

const ThreadSchema = new Schema({
	author: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
	title: { type: String, required: true },
	head: { type: Schema.Types.ObjectId, ref: 'coop' },
	category: { type: String, required: true },
	timestamp: { type: Date, required: true, default: Date.now }
});
module.exports = mongoose.model('thread', ThreadSchema);

//module.exports = mongoose.model('comment', CommentSchema);
