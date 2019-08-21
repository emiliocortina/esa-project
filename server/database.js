const mongoose = require('mongoose');
const logger = require('node-color-log');

mongoose.set('useCreateIndex', true); //fix deprecated error
const URI = 'mongodb+srv://admin:admin@cooper-cluster-kjm9g.mongodb.net/test?retryWrites=true&w=majority';
logger.info('Conecting database...');
mongoose
	.connect(URI, { useNewUrlParser: true })
	.then((db) => {
		logger.info('DB is connected');
	})
	.catch((err) => logger.error(err));
module.exports = mongoose;
