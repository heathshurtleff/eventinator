/*global angular, _, Promise */

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
		},
		getAllStops: function() {
			return fetch('/app/mtaStops').then(function(response) {
				return response.json();
			}).then(function(trips) {
				return trips;
			});
		},
		getStopsForRoute: function(routeId, direction) {
			return fetch('/app/mtaStops/' + routeId + '/' + direction).then(function(response) {
				return response.json();
			}).then(function(data) {
				return data;
			});
		},
		getTripsForRoute: function(routeId, dir) {
			return fetch('/app/mtaTrips/' + routeId + '/' + dir).then(function(response) {
				return response.json();
			}).then(function(data) {
				return data;
			});
		},
		getStopTimesByTrip: function(tripId) {
			return fetch('/app/mtaStopTimes/trip/' + tripId).then(function(response) {
				return response.json();
			}).then(function(data) {
				return data;
			});
		},
		getStoptimesForStop: function(routeId, stopId, direction) {
			return fetch('/app/mtaStopTimes/' + routeId + '/' + stopId + '/' + direction).then(function(response) {
				return response.json();
			}).then(function(data) {
				return data;
			}).catch(function(err) {
				console.log(err);
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