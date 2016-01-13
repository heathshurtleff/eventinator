/*eslint-env node */

var express = require('express');
var lr = require('connect-livereload');

module.exports = function(app, config) {
	app.engine('html', require('ejs').renderFile);
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'html');
	if(process.env.NODE_ENV === 'development') {
		app.use(lr({port: 35729}));
	}
	app.use(express.static(config.rootPath + '/public'));
};