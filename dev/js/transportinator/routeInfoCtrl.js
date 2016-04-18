/*global angular */

angular.module('transportinator').controller('routeInfoController', ['$scope', '$stateParams', function($scope, $stateParams) {
	$scope.testVar = $stateParams.id;
}]);