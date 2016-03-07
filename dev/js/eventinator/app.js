/*global angular,$*/

angular.module('eventinator', ['ui.router', 'ngResource']);

angular.module('eventinator').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('main', {
			url: '/',
			templateUrl: 'app/events/eventList.html',
			controller: 'eventinatorCtrl'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: 'app/events/eventSignup.html',
			controller: 'eventSignupCtrl'
		})
		.state('create', {
			url: '/create',
			templateUrl: 'app/events/createEvent.html',
			controller: 'createEventCtrl'
		});
}]);

angular.module('eventinator').controller('eventinatorCtrl', ['$scope', 'eventIdentity', 'authService', '$location', 'eventsService', function($scope, eventIdentity, authService, $location, eventsService){
	$scope.identity = eventIdentity;
	eventsService.fetchEvents().then(function(events){
		$scope.events = events;
	}, function(excuse) {
		$scope.eventsFail = excuse;
	});
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
}])
.filter('url', function() {
	return window.encodeURIComponent;
});