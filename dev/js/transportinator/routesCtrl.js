/*global angular*/

angular.module('transportinator').controller('routesController', ['$scope', function($scope) {
	$scope.testvar = 'Itsa Work!';
	$scope.routes = {};
	fetch('/app/gtfsData?type=routes').then(function(response) {
		return response.json();
	}).then(function(json) {
		$scope.$apply(function() {
			$scope.routes = json;
		});
	});
}]);