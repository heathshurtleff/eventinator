/*global angular,$*/

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
		})
		.state('create', {
			url: '/create',
			templateUrl: 'app/create/createEvent.html',
			controller: 'createEventCtrl'
		});
}]);

angular.module('eventinator').controller('eventinatorCtrl', ['$scope', 'eventIdentity', 'authService', '$location', function($scope, eventIdentity, authService, $location){
	$scope.identity = eventIdentity;
	$scope.signin = function(email, pwd) {
		authService.authenticateUser(email, pwd).then(function(success) {
			if(!success) {
				$('.sign-in-error .help-block').css('opacity', 1);
			}
		});
	};
	$scope.signout = function() {
		authService.logoutUser().then(function() {
			$scope.emial = '';
			$scope.password = '';
			$location.path('/');
		});
	};
}]);