/*global angular */

angular.module('transportinator').factory('tripsService', [function() {
	var allTrips;
	var tripFunctions = {
		getAllTrips: function() {
			return fetch('/app/utaTrips').then(function(response) {return response.json();}).then(function(json) {
				allTrips = json;
				return allTrips;
			});
		},
		getTripData: function(tripId) {
			return fetch('/app/utaFullTrip/' + tripId).then(function(response) {
				return response.json();
			});
		}
	};

	return tripFunctions;
}]);