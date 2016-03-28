/*eslint-env node */

var fs = require('fs');
var Converter = require('csvtojson').Converter;
var convert = new Converter({});

exports.getStatic = function(req, res, next) {
	convert.on('end_parsed', function(jsonArray) {
		res.send(jsonArray);
	});

	fs.createReadStream('server/data/uta-gtfs/' + req.query.type + '.txt').pipe(convert);
}