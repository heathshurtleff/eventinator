/*eslint-env node */

var passport = require('passport');

exports.authenticateUser = function(req,res,next) {
	req.body.email = req.body.email.toLowerCase();
	console.log(req.body.password);
	var auth = passport.authenticate('local', function(error, user) {
		if(error) {return next(error);}

		if(!user) {res.send({success: false});}
		req.logIn(user, function(error) {
			if(error) {return next(error);}
			res.send({success:true, user: user});
		});
	});
	console.log(req.body.email);
	auth(req, res, next);
};