/*global angular, _ */

angular.module('transportinator').factory('routesService', ['idbService', function(idbService) {
	var allRoutes;
	return {
		getAllRoutes: function() {
			if(allRoutes !== undefined) return allRoutes;
			return new Promise(function(resolve, reject) {
				idbService.getRoutes().then(function(data) {
					if(data.length > 0) {
						resolve(data);
					} else {
						fetch('/app/mtaData').then(function(response) {
							return response.json();
						}).then(function(routes) {
							if(!routes) reject('No routes found');
							idbService.saveRoutes(routes).then(function() {
								resolve(routes);
							});
						}).catch(function(err) {
							reject(err);
						});
					}
				});
			});

			// return fetch('/app/mtaData').then(function(response) {
			// 	return response.json();
			// }).then(function(routes) {
			// 	allRoutes = new Promise(function(resolve, reject) {
			// 		if(!routes) reject('No routes found');
			// 		idbService.saveRoutes(routes).then(function() {
			// 			resolve(routes);
			// 		});
			// 	});
			// 	return routes;
			// }).catch(function(err) {
			// 	console.log(err);
			// });
		},
		getAllStops: function() {
			return fetch('/app/mtaStops').then(function(response) {
				return response.json();
			}).then(function(trips) {
				return trips;
			});
		},
		getStopsForRoute: function(routeId) {
			return fetch('/app/mtaStops/' + routeId).then(function(response) {
				return response.json();
			}).then(function(data) {
				return data;
			});
		},
		getTripsForRoute: function(routeId) {
			return fetch('/app/mtaTrips/' + routeId).then(function(response) {
				return response.json();
			}).then(function(data) {
				return data;
			}).then(function(trips) {
				return new Promise(function(resolve, reject) {
					if(!trips || trips.length === 0) reject('No trips found!');
					_.each(trips, function(trip) {
						fetch('/app/mtaStopTimes/trip/' + trip.trip_id).then(function(response) {
							return response.json();
						}).then(function(data) {
							trip.stoptimes = data;
							if(trips.indexOf(trip) + 1 === trips.length) {
								resolve(trips);
							}
						});
					});
				});
			});
		},
		getStopTimesByTrip: function(tripId) {
			return fetch('/app/mtaStopTimes/trip/' + tripId).then(function(response) {
				return response.json();
			}).then(function(data) {
				return data;
			});
		},
		getRouteUpdate: function(routeId) {
			return fetch('/app/mtaUpdate/' + routeId).then(function(response) {
				return response.json();
			}).then(function(updateData) {
				var updatedRouteData = {};
				updatedRouteData.timestamp = new Date().getTime();
				var updatesForRoute = _.filter(updateData.entity, function(entity) {
					var isCorrectRoute = false;
					if(entity.trip_update) {
						if(entity.trip_update.trip.route_id === routeId) isCorrectRoute = true;
					} else if (entity.vehicle) {
						if(entity.vehicle.trip.route_id === routeId) isCorrectRoute = true;
					}
					return isCorrectRoute;
				});
				updatedRouteData.entities = updatesForRoute;
				return updatedRouteData;
			});
		}
	};
}]);