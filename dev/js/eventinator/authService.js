/*global angular*/

angular.module('eventinator').factory('authService', ['$q', '$http', 'eventUser', 'eventIdentity', function($q, $http, eventUser, eventIdentity) {
	return {
		authenticateUser: function(email, pass) {
			var def = $q.defer();
			$http.post('/app/eventLogin', {email: email, password:pass}).then(function(resp) {
				console.log(resp.data);
				if(resp.data.success) {
					var evtUser = new eventUser();
					angular.extend(evtUser, resp.data.user);
					eventIdentity.currentUser = evtUser;
					def.resolve(true);
				} else {
					def.resolve(false);
				}
			});
			return def.promise;
		},
		createEvtUser: function(newUser) {
			var newEvtUser = new eventUser(newUser);

			var def = $q.defer();

			newEvtUser.$save().then(function() {
				eventIdentity.currentUser = newEvtUser;
				def.resolve();
			}, function(response) {
				def.reject(response.data.excuse);
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