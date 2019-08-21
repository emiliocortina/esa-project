exports.buildError = function(url, status, error_code, description = '') {
	const message = `${url}|${status}|${error_code}|${description}`;
	return new Error(message);
};

exports.parseError = function(message) {
	const parsed = message.split('|');

	var object = {
		url: parsed[0],
		status: parsed[1],
		error_code: parsed[2]
	};
	if (parsed[3] !== '') {
		object['error_description'] = parsed[3];
	}
	return object;
};
