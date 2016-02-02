/*eslint-env node */

var Events = require('mongoose').model('Events');

exports.createEvent = function(req,res) {
	var eventData = req.body;

	Events.create(eventData, function(error, evt) {
		if(error) {
			res.status(400);
			return res.send({excuse: error.toString()});
		}

		res.send(evt);
	});
};