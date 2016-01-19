/*eslint-env node*/

var mongoose = require('mongoose');
var encrypt = require('../utils/encrypt');

var eventUserSchema = mongoose.Schema({
	fullName: {type: String, required: '{PATH} is required.'},
	email: {type: String, required: '{PATH} is required.', unique: true},
	company: {type: String},
	job: {type: String},
	bday: {type: Date},
	address: {type: String},
	salt: {type: String, required: '{PATH} is required.'},
	hashed_pwd: {type: String, required: '{PATH} is required.'}
});

eventUserSchema.methods = {
	authenticate: function(passwordToMatch) {
		return encrypt.hashPass(this.salt, passwordToMatch) === this.hashed_pwd;
	}
};

var EventUser = mongoose.model('EventUser', eventUserSchema);