/*global angular*/

if( 'serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(function(reg) {
		console.log('ServiceWorker registration successful with scope: ' + reg.scope);
	}).catch(function(err) {
		console.log('ServiceWorker registration failed: ', err);
	});
}

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
