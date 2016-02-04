/*eslint-env node */

var Events = require('mongoose').model('Events');

exports.getEvents = function(req,res) {
	Events.find({}).lean().exec(function(err, events) {
		if(err) {
			res.status(400);
			return res.send({excuse: err.toString()});
		}
		res.send(JSON.stringify(events));
	});
};

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