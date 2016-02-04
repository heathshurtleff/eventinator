/*global angular, $*/

angular.module('eventinator').controller('createEventCtrl', ['$scope', '$location', 'addressService', 'events', 'validationService', 'toastrService', function($scope, $location, addressService, events, validationService, toastrService) {
	$scope.eventHost = $scope.identity.currentUser.fullName;

	var $inputs = $('input, textarea');

	$inputs.on('focus blur keyup change input', function(e) {
		var $input = $(this);

		if(e.type === 'input') {
			$scope.create.eventType.$validate();
			$input.change();
		}

		validationService.checkFieldStatus($input, e);
	});

	$('#formSubmit').on('click', function(e) {
		e.preventDefault();
	});

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

		var $form = $('#eventCreationForm');

		if($form.hasClass('ng-valid')) {
			newEventObj.$save().then(function(evt) {
				toastrService.toast('success', evt.title + ' successfully created!');
				//$location.path('/');
			}, function(response) {
				$('.full-form-error').text(response.statusText + ' | ' + response.data.excuse);
			});
		} else {
			$inputs.each(function() {
				var $input = $(this);
				var e = {type: 'jQueryEach'};

				$input.removeClass('ng-pristine');
				validationService.checkFieldStatus($input, e);
			});
		}
	};

	var $loc = $('#location');
	$loc.on('focus', function() {
		var $input = $(this);

		addressService.initAutocomplete($input.attr('id'));
		addressService.geolocate();

		addressService.autocomplete.addListener('place_changed', function() {
			$scope.eventLocation = $loc.val();
		});
	});

	$(function() {
		$('[data-toggle=popover]').popover();
	});
}]);