/*eslint-env node */

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, config) {
	app.engine('html', require('ejs').renderFile);
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'html');
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(session({secret: 'Udacity ND802', resave: false, saveUninitialized: true}));
	app.use(passport.initialize());
	app.use(passport.session());
	if(process.env.NODE_ENV === 'development') {
		var lr = require('connect-livereload');
		app.use(lr({port: 35729}));
	}
	app.use(express.static(config.rootPath + '/public'));
};