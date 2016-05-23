/*global angular*/

angular.module('transportinator').controller('routesController', ['$scope', '$location', 'routesService', function($scope, $location, routesService) {
	routesService.getAllRoutes().then(function(data) {
		$scope.$apply(function() {

			$scope.routes = data;
		});
	});

	$scope.fetchRouteUpdate = function(routeId) {
		console.log(routeId);
		$location.path('/route/' + routeId);
	};
}]);