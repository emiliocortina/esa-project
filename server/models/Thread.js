const mongoose = require('mongoose');
const { Schema } = mongoose;

let CoopSchema = new Schema({
	author: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
	data: { type: Schema.Types.ObjectId, ref: 'satelliteData' },
	timestamp: { type: Date, required: true, default: Date.now },
	text: { type: String, required: false },
	likes: [ { type: Schema.Types.ObjectId, ref: 'user' } ],
	children: [ { type: Schema.Types.ObjectId, ref: 'coop' } ]
});

const ThreadSchema = new Schema({
	author: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
	title: { type: String, required: true },
	head: { type: Schema.Types.ObjectId, ref: 'coop' },
	category: { type: String, required: true }
});
module.exports = {
	ThreadSchema: mongoose.model('thread', ThreadSchema),
	CoopSchema: mongoose.model('coop', CoopSchema)
};
//module.exports = mongoose.model('comment', CommentSchema);
