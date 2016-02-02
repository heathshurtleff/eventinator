/*eslint-env node*/

var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	title: {type: String, required: '{PATH} is required.'},
	host: {type: String, required: '{PATH} is required.'},
	type: {type: String, required: '{PATH} is required.'},
	start: {type: Date, required: '{PATH} is required'},
	end: {type: Date, required: '{PATH} is required'},
	location: {type: String, required: '{PATH} is required.'},
	guests: {type: String, required: '{PATH} is required.'},
	info: {type: String}
});

var Events = mongoose.model('Events', eventSchema);