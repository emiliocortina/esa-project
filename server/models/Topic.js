const mongoose = require('mongoose');
const { Schema } = mongoose;

let CommentSchema = new Schema({
	text: { type: String, required: false },
	satellite_data: { type: String, required: false },
	//MAKESURE comprobar a nivel de controller que uno de los esta
	timestamp: { type: Date, required: true, default: Date.now },
	user: { type: String, required: true },

	liked: [ String ]
});

CommentSchema.add({ answers: [ CommentSchema ] }); //para poder tener comentarios dentro de comentarios

const TopicSchema = new Schema({
	title: { type: String, required: true },
	text_content: { type: String, required: true },
	user: { type: String, required: true }, //de momento con un string del usuario nos vale
	timestamp: { type: Date, required: false, default: Date.now },
	satellite_data: { type: String, required: false },
	comments: [ CommentSchema ],
	edited: { type: Boolean, default: false },
	liked: [ String ]
});
module.exports = {
	TopicSchema: mongoose.model('topic', TopicSchema),
	CommentSchema: CommentSchema
};
//module.exports = mongoose.model('comment', CommentSchema);
