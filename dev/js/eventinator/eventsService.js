/*global angular*/

angular.module('eventinator').factory('eventsService', ['$q', '$http', function($q, $http) {
	return {
		fetchEvents: function() {
			var def = $q.defer();

			$http.get('./app/events').then(function(response) {
				def.resolve(response.data);
			}, function(err) {
				console.log(err);
			});

			return def.promise;
		}
	};
}]);