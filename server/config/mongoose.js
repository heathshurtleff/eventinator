/*eslint-env node */

var mongoose = require('mongoose');
var eventUserModel = require('../dbmodels/EventUser');
var eventsModel = require('../dbmodels/Events');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'There was a problem connecting...'));
	db.once('open', function callback() {
		console.log('connected to database');
	});
};