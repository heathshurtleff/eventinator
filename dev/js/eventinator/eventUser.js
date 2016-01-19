/*global angular*/

angular.module('eventinator').factory('eventUser', ['$resource', function($resource) {
	var User = $resource('/app/eventUsers/:id', {_id: '@id'}, {
		update: {method: 'PUT', isArray: false}
	});

	return User;
}]);