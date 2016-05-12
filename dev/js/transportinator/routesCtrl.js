/*global angular*/

angular.module('transportinator').controller('routesController', ['$scope', '$location', 'routesService', function($scope, $location, routesService) {
	$scope.testvar = 'Itsa Work!';

	routesService.getAllRoutes().then(function(data) {
		$scope.$apply(function() {
			$scope.routes = data;
		});
	});
	routesService.getAllStops().then(function(data) {
		$scope.$apply(function() {
			$scope.stops = data;
		});
	});

	$scope.fetchRouteUpdate = function(routeId) {
		if(parseInt(routeId) <= 6) {
			$location.path('/route/' + routeId);
		}
	};
}]);