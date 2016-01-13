/*eslint-env node */

module.exports = function(app) {

	app.get('/', function(req,res) {
		res.render('index');
	});
	app.route('/events')
		.get(function(req,res) {
			res.render('events/index');
		});
};