/*eslint-env node */

var auth = require('./auth');
var eventUsers = require('../controllers/evtUsers');
var events = require('../controllers/events');

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
	app.post('/app/eventLogin', auth.authenticateUser);

	app.get('/app/events', events.getEvents);
	app.post('/app/createEvent', events.createEvent);

	app.post('/app/logout', function(req, res) {
		req.logout();
		res.end();
	});
};