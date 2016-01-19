/*global angular*/

angular.module('eventinator', ['ui.router', 'ngResource']);

angular.module('eventinator').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'app/main/eventList.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'app/signup/eventSignup.html',
			controller: 'eventSignupCtrl'
		});
}]);

angular.module('eventinator').controller('eventinatorCtrl', ['$scope', 'eventIdentity', 'authService', '$location', function($scope, eventIdentity, authService, $location){
	$scope.identity = eventIdentity;
	$scope.signout = function() {
		authService.logoutUser().then(function() {
			$scope.emial = '';
			$scope.password = '';
			$location.path('/');
		});
	};
}]);