var ee = require('@google/earthengine');
var ee = require('@google/earthengine');
var privateKey = require('./privatekey.json');

// Initialize client library and run analysis.
var runAnalysis = function() {
	ee.initialize(
		null,
		null,
		function() {
			// ... run analysis ...
		},
		function(e) {
			console.error('Initialization error: ' + e);
		}
	);
};

// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
	console.error('Authentication error: ' + e);

	// Authenticate using one (but not both) of the methods below.
});

// ee.data.authenticateViaPrivateKey(privateKey);

// ee.initialize();

// // Run an Earth Engine script.
// var image = new ee.Image('srtm90_v4');
// image.getMap({ min: 0, max: 1000 }, function(map) {
// 	console.log(map);
// });
