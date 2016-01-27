/*eslint-env node */

var passport = require('passport'),
	mongoose = require('mongoose'),
	Local = require('passport-local').Strategy,
	EventUser = mongoose.model('EventUser');

module.exports = function() {
	passport.use(new Local(function(email, pass, done) {
		EventUser.findOne({email: email}, function(err, user) {
			console.log(user);
			if(user && user.authenticate(pass)) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}));

	passport.serializeUser(function(user, done) {
		if(user) {
			done(null, user._id);
		}
	});

	passport.deserializeUser(function(id, done) {
		EventUser.findOne({_id:id}).exec(function(err, user) {
			if(user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	});
};