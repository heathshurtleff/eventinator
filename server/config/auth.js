/*eslint-env node */

var passport = require('passport');

exports.authenticateUser = function(req,res,next) {
	req.body.email = req.body.email.toLowerCase();
	var auth = passport.authenticate('local', function(error, user) {
		if(error) {return next(error);}

		if(!user) {res.send({success: false});}
		req.logIn(user, function(error) {
			if(error) {return next(error);}
			res.send({success:true, user: user});
		});
	});
	auth(req, res, next);
};