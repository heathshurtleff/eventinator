/*global angular*/

angular.module('eventinator').factory('eventIdentity', ['$window', 'eventUser', function($window, eventUser) {
	var currentUser;
	if(!!$window.bootstrappedEventUser) {
		currentUser = new eventUser();
		angular.extend(currentUser, $window.bootstrappedEventUser);
	}
	return {
		currentUser: currentUser,
		authenticated: function() {
			return !!this.currentUser;
		}
	};
}]);