const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
	
	email: { type: String, required: true, unique:true},
	name: { type: String, required: true },
	nickName: { type: String, required: true, unique:true},
	password: { type: String, requied: true },
	unencodedPass: { type: String, required: false },
	avatarId: {type: String, requied: false}
});
module.exports = mongoose.model('user', userSchema);
