/*eslint-env node */

module.exports = function(app) {

	app.get('/', function(req,res) {
		res.render('index');
	});
};