const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const { mongoose } = require('./database');
var logger = require('logger').createLogger(); // logs to STDOUT

//Server settings
const port = 3000;
app.set('port', process.env.PORT || port); //for production
app.set('logger',logger)
//Middlewares
app.use(morgan('dev')); //debbug the petitions
app.use(express.json());
app.use(
	cors({
		origin: '*'
	})
);

//Routes

app.use('/auth', require('./routes/users.routes.js'));

//middleware
app.use('/api/private', require('./middleware/autenticated.middleware'));
app.use('/api/private', require('./routes/events.routes'));

//Error manager
app.use(function(err, req, res, next) {
	logger.error(err);
	res.json({
		status: err.status || 500,
		message: 'Server error'
	});
});
//Server start
app.listen(app.get('port'), () => {
	console.log(`Server listening on port ${app.get('port')}`);
});
