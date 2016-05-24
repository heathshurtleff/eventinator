/*eslint-env node */

var proto = require('protobufjs');
var path = require('path');

module.exports = function(response) {
	var subwayProto = path.resolve(__dirname + '/../data/nyct-subway.proto');

	var update = proto.loadProtoFile(subwayProto);
	var updateBuild = update.build('transit_realtime');

	return new Promise(function(resolve, reject) {
		var data = [];

		response.body.on('data', function(chunk) {
			data.push(chunk);
		});

		response.body.on('error', function(err) {
			reject(err);
		});

		response.body.on('end', function() {
			data = Buffer.concat(data);

			if(data.length < 1) return done(null, data);
			var parsedData;
			try {
				parsedData = updateBuild.FeedMessage.decode(data);
			} catch(err) {
				console.log(err);
				reject(err);
			}

			resolve(parsedData);
		});
	});
};