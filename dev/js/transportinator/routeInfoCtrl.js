/*global angular, _ */

angular.module('transportinator').controller('routeInfoController', ['$scope', '$stateParams', 'routesService', function($scope, $stateParams, routesService) {
	$scope.routeId = $stateParams.id;

	routesService.getStopsForRoute($scope.routeId).then(function(stops) {
		$scope.$apply(function() {
			$scope.stops = stops;
		});
	});
	routesService.getTripsForRoute($scope.routeId).then(function(trips) {
		var sortedTrips = _.sortBy(trips, function(trip) {
			return trip.stoptimes[0].departure_time;
		});
		$scope.$apply(function() {
			$scope.trips = sortedTrips;
		});
	});
}]);