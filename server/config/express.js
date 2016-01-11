/*eslint-env node */

var express = require('express');

module.exports = function(app, config) {
	app.engine('html', require('ejs').renderFile);
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'html');
	app.use(express.static(config.rootPath + '/public'));
};