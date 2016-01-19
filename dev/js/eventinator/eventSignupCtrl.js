/*global angular*/

angular.module('eventinator').controller('eventSignupCtrl', ['$scope', '$location', 'eventUser', 'authService', function($scope, $location, eventUser, authService) {

	$scope.eventSignup = function() {
		var newUser = {
			email: $scope.email,
			password: $scope.password,
			fullName: $scope.fullName,
			company: $scope.company,
			job: $scope.job,
			bday: $scope.bday,
			homeAddress: $scope.homeAddress
		};

		authService.createEvtUser(newUser).then(function() {
			//TODO: User Feedback
			$location.path('/');
		}, function(excuse) {
			//TODO: display error in some way
			console.log(excuse);
		});
	};
}]);
