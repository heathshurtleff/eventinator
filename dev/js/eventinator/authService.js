/*global angular*/

angular.module('eventinator').factory('authService', ['$q', '$http', 'eventUser', 'eventIdentity', function($q, $http, eventUser, eventIdentity) {
	return {
		// authenticateUser: function(user, pass) {
		// 	var def = $q.defer();
		// 	$http.post('/eventLogin', {username: user, password:pass}).then(function(resp) {
		// 		if(resp.data.success) {
		// 			var evtUser = new eventUser();
		// 		} else {
		// 			def.resolve(false);
		// 		}
		// 	});
		// },
		createEvtUser: function(newUser) {
			var newEvtUser = new eventUser(newUser);

			var def = $q.defer();

			newEvtUser.$save().then(function() {
				eventIdentity.currentUser = newEvtUser;
				def.resolve();
			}, function(response) {
				def.reject(response.data.reason);
			});

			return def.promise;
		},
		logoutUser: function() {
			var def = $q.defer();
			$http.post('/app/logout', {logout:true}).then(function() {
				eventIdentity.currentUser = undefined;
				def.resolve();
			});
			return def.promise;
		}
	};
}]);