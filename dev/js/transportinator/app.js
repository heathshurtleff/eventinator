/*global angular,$*/

// $(document).ready(function() {
// 	$.ajax({
// 		url: '/app/gtfsData',
// 		data: {type: 'routes'},
// 		success: function(data) {
//
// 		}
// 	});
// });

angular.module('transportinator', ['ui.router', 'ngResource']);

angular.module('transportinator').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('routes', {
		url: '/',
		templateUrl: 'app/transport/routes.html',
		controller: 'routesController'
	})
	.state('route', {
		url: '/route/:id',
		templateUrl: 'app/transport/routeInfo.html',
		controller: 'routeInfoController'
	});
}]);