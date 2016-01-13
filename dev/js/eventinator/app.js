/*global angular*/

angular.module('eventinator', ['ui.router']);

angular.module('eventinator').controller('eventinatorCtrl', ['$scope', function($scope){
	$scope.testVar = 'This is finally working! Nice!';
}]);