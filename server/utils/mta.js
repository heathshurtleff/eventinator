/*eslint-env node */
/* global Promise */

var fs = require('fs');
var path = require('path');
var parseCsv = require('csv-parse');
var fetch = require('node-fetch');
var gtfsParse = require('./gtfsParser');
var gtfs = require('gtfs');
var _ = require('underscore');

var config = {
	apiKey: process.env.MTA_API_KEY || '9e9ef97c85d98b3378011409f0f895d1',
	feedId: 1
};

var gtfsBaseUrl = 'http://datamine.mta.info/mta_esi.php?';
exports.allRoutes = function(req, res) {
	return new Promise(function(resolve, reject) {
		gtfs.getRoutesByAgency('MTA', function(err, routes) {
			if(err) return reject(err);
			var sorted = _.sortBy(routes, 'route_short_name');
			var excludeMe = _.findIndex(sorted, function(item) {
				return item.route_id === '5X';
			});
			sorted.splice(excludeMe, 1);
			resolve(sorted);
		});
	}).then(function(response) {
		res.send(response);
	}).catch(function(err) {
		console.log(err);
	});
};
exports.allStops = function(req, res) {
	var stops = fs.readFileSync(path.join(__dirname, '../data/mta-gtfs/stops.txt'));
	return new Promise(function(resolve, reject) {
		parseCsv(stops, {columns: true, objname: 'stop_id'},
		function(error, data) {
			if(error) {return reject(error);}
			resolve(data);
		});
	}).then(function(response) {
		res.send(response);
	}).catch(function(err) {
		console.log(err);
	});
};
exports.getRouteUpdate = function(req, res) {
	var mtaDataUrl = gtfsBaseUrl + 'key=' + config.apiKey + '&feed_id=' + config.feedId;

	fetch(mtaDataUrl).then(gtfsParse).then(function(data) {
		if(!data.entity || !Array.isArray(data.entity)) {
			throw(new Error('MTA response is not formatted correctly'));
		}
		res.send(data);
	}).catch(function(err) {
		console.log(err);
	});
};
exports.stopsForRoute = function(req, res) {
	return new Promise(function(resolve, reject) {
		gtfs.getStopsByRoute('MTA', req.params.routeId, parseInt(req.params.dir), function(err, stops) {
			if(err) return reject(err);
			resolve(stops);
		});
	}).then(function(response) {
		res.send(response);
	}).catch(function(err) {
		console.log(err);
	});
};
exports.stopTimesForStop = function(req, res) {
	return new Promise(function(resolve, reject) {
		gtfs.getStoptimesByStop('MTA', req.params.routeId, req.params.stopId, req.params.dir, function(err, stoptimes) {
			if(err) return reject(err);
			resolve(stoptimes);
		});
	}).then(function(response) {
		res.send(response);
	}).catch(function(err) {
		console.log(err);
	});
};
exports.tripsForRoute = function(req, res) {
	return new Promise(function(resolve, reject) {
		gtfs.getTripsByRouteAndDirection('MTA', req.params.routeId, parseInt(req.params.dir), ['A20151206WKD', 'B20151206SUN', 'B20151206WKD', 'R20150510WKD'], function(err, trips) {
			if(err) return reject(err);
			resolve(trips);
		});
	}).then(function(response) {
		res.send(response);
	}).catch(function(err) {
		console.log(err);
	});
};
exports.stopTimesForTrip = function(req, res) {
	return new Promise(function(resolve, reject) {
		gtfs.getStoptimesByTrip('MTA', req.params.tripId, function(err, stopTimes) {
			if(err) return reject(err);
			resolve(stopTimes);
		});
	}).then(function(response) {
		res.send(response);
	}).catch(function(err) {
		console.log(err);
	});
};