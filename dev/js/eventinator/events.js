/*global angular*/

angular.module('eventinator').factory('events', ['$resource', function($resource) {
	var Event = $resource('app/createEvent/:id', {_id: '@id'}, {
		update: {method: 'PUT', isArray: false}
	});

	return Event;
}]);