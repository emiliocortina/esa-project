const mongoose = require('mongoose');
const URI =
	'mongodb+srv://admin:admin@glowingumbrella-7m46k.mongodb.net/GlowingUmbrella?retryWrites=true&w=majority';
mongoose
	.connect(URI,{ useNewUrlParser: true })
	.then((db) => {
		console.log('DB is connected');
	})
	.catch((err) => console.error(err));
module.exports = mongoose;
