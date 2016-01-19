/*eslint-env node */

var eventUsers = require('../controllers/evtUsers');

module.exports = function(app) {

	app.get('/', function(req,res) {
		res.render('index');
	});
	app.route('/eventinator')
		.get(function(req,res) {
			res.render('events/index', {
				bootstrappedEventUser: JSON.stringify(req.user)
			});
		}
	);

	app.post('/app/eventUsers', eventUsers.createUser);

	app.post('/app/logout', function(req, res) {
		req.logout();
		res.end();
	});

};