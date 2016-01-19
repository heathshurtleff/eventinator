/*eslint-env node */

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://127.0.0.1/eventinator',
		port: process.env.PORT || 3033
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGOLAB_URI,
		port: process.env.PORT || 80
	}
};