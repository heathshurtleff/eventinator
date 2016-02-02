/*global angular, $*/

angular.module('eventinator').controller('createEventCtrl', ['$scope', 'addressService', 'events', function($scope, addressService, events) {
	$scope.eventHost = $scope.identity.currentUser.fullName;

	$scope.eventCreation = function() {
		var newEvent = {
			title: $scope.eventTitle,
			host: $scope.eventHost,
			type: $scope.eventType,
			start: $scope.eventStart,
			end: $scope.eventEnd,
			location: $scope.eventLocation,
			guests: $scope.guests,
			info: $scope.info
		};

		var newEventObj = new events(newEvent);

		newEventObj.$save().then(function() {
			// Do something here?
		}, function(response) {
			console.log(response.data.excuse, response.statusText);
			$('.full-form-error').text(response.statusText + ' | ' + response.data.excuse);
		});
	};

	var $location = $('#location');
	$location.on('focus', function() {
		var $input = $(this);

		addressService.initAutocomplete($input.attr('id'));
		addressService.geolocate();

		addressService.autocomplete.addListener('place_changed', function() {
			$scope.eventLocation = $location.val();
		});
	});
}]);