const express = require('express');
const bearerToken = require('express-bearer-token');
const app = express();
const logger = require('node-color-log');
const morgan = require('morgan');
const cors = require('cors');
const errorServ = require('./services/error.service');

const { mongoose } = require('./database');

//Server settings
const port = 3000;
app.set('port', process.env.PORT || port); //for production

//Middlewares
app.use(bearerToken());
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
app.use('/api/private', require('./routes/satelliteData.routes'));
app.use('/api/private', require('./routes/topics.routes'));
app.use('/api/private', require('./routes/comments.routes'));

//Error manager
app.use(function(err, req, res, next) {
	const errorObject = errorServ.parseError(err.message);

	if (typeof errorObject.status == 'undefined') {
		//problema del programador, no se ha lanzado correctamente el error
		//o algo ha petao mu jarto,
		//     (ノಠ益ಠ)ノ彡┻━┻
		//reza para que el server no se pare
		logger.error(err);
		res.status(400).json({ error: 'undefined error' });
		return;
	}

	res.status(parseInt(errorObject.status)).json(errorObject);
	return;
});

//Server start
app.listen(app.get('port'), () => {
	logger.info(`Server listening on port ${app.get('port')}`);
});
