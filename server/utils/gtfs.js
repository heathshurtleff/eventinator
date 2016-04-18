/*eslint-env node */

var csvjson = require('csvjson');

exports.getStatic = function(req, res) {
	res.send(csvjson.toObject('server/data/uta-gtfs/' + req.query.type + '.txt').output);
};