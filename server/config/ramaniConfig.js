var ramani = require('ramani');
const logger = require('node-color-log');
logger.info('Setting up RAMANI configuration');
ramani.init({
	username: 'emiliocortina2',
	apiKey: '528b756fa928f39ba2e03e0c7f5134dc',
	package: 'com.emiliocortina2.ramaniapi'
});
logger.info('RAMANI set up!');

module.exports = ramani;
