/*eslint-env node */

var auth = require('./auth');
var eventUsers = require('../controllers/evtUsers');
var events = require('../controllers/events');
var mta = require('../utils/mta');

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
	app.route('/transportinator')
		.get(function(req,res) {
			res.render('transport/index');
		}
	);

	app.get('/app/mtaData', mta.allRoutes);
	app.get('/app/mtaStops', mta.allStops);
	app.get('/app/mtaStops/:routeId', mta.stopsForRoute);
	app.get('/app/mtaTrips/:routeId', mta.tripsForRoute);
	app.get('/app/mtaStopTimes/trip/:tripId', mta.stopTimesForTrip);
	app.get('app/mtaStopTimes/:routeId/:stopId', mta.stopTimesForStop);
	app.get('/app/mtaUpdate/:routeId', mta.getRouteUpdate);

	app.post('/app/eventUsers', eventUsers.createUser);
	app.post('/app/eventLogin', auth.authenticateUser);

	app.get('/app/events', events.getEvents);
	app.post('/app/createEvent', events.createEvent);

	app.post('/app/logout', function(req, res) {
		req.logout();
		res.end();
	});
};