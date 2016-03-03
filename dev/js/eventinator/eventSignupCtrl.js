/*global angular,$*/

angular.module('eventinator').controller('eventSignupCtrl', ['$scope', '$location', 'eventUser', 'authService', 'addressService', 'validationService', function($scope, $location, eventUser, authService, addressService, validationService) {
	$scope.validForm = true;
	$scope.eventSignup = function() {
		var newUser = {
			username: $scope.email,
			password: $scope.password,
			fullName: $scope.fullName,
			company: $scope.company,
			job: $scope.job,
			bday: $scope.bday,
			homeAddress: $scope.homeAddress
		};
		var hasErrors = false;

		$inputs.each(function() {
			var $input = $(this);

			if($input.hasClass('ng-invalid')) {
				hasErrors = true;
			}
		});

		if(!hasErrors) {
			authService.createEvtUser(newUser).then(function() {
				$location.path('/');
			}, function(excuse) {
				$('.full-form-error').text(excuse);
			});
		}
	};

	var $inputs = $('#eventSignUpForm input[id!="password"]');
	var $pass = $('#password');
	var $confPass = $('#confPass');
	var $addr = $('#homeAddr');
	var invalidChars = /[^A-z0-9\!\@\#\$\&\*\_ \.\?]/g;

	$pass.popover({
		container: 'body',
		content: '<div class="pass-confirm-container"><div class="requirement-box upper">A</div><div class="requirement-box lower">a</div><div class="requirement-box num">0-9</div><div class="requirement-box punct">!&amp;?</div><div class="requirement-box chars">8+</div></div>',
		html: true,
		placement: 'top',
		trigger: 'focus',
		template: '<div class="popover pwd-popover"><div class="arrow"></div><div class="popover-content"></div></div>'
	});

	$confPass.popover({
		container: 'body',
		content: 'Confirm your password',
		html: true,
		placement: 'top',
		trigger: 'focus'
	});

	$(function() {
		$('[data-toggle=popover]').popover();
	});
	$inputs.on('focus keyup blur', function(e) {
		var $input = $(this);

		validationService.checkFieldStatus($input, e);
	});

	$pass.on('focus keyup', function() {
		passwordValidator($(this));
	});

	$confPass.on('focus keyup blur', function() {
		var $input = $(this);

		validationService.changeValidationIcon($input, $scope.password !== $scope.confPass);
		if($scope.password !== $scope.confPass) {
			validationService.updatePopoverText($input, 'You passwords must match');
		} else {
			validationService.updatePopoverText($input, 'We have a match!');
		}
	});

	$addr.on('focus', function() {
		var $input = $(this);

		addressService.initAutocomplete($input.attr('id'));
		addressService.geolocate();

		addressService.autocomplete.addListener('place_changed', function() {
			$scope.homeAddress = $addr.val();
		});
	});

	function passwordValidator($input) {
		var pwdVal = $input.val();
		var passedConditions = {
			upper: pwdVal.search(/[A-Z]/g) > -1,
			lower: pwdVal.search(/[a-z]/g) > -1,
			num: pwdVal.search(/[0-9]/g) > -1,
			punct: pwdVal.search(/[!#$@\?\&\*\_ \.]/g) > -1,
			chars: pwdVal.length >= 8,
			invalidChars: pwdVal.search(invalidChars) > -1
		};

		changeDisplay(passedConditions, $input);
	}

	function changeDisplay(cond, $input) {
		var $validationDisplay = $('.pass-confirm-container');
		var $allBoxes = $validationDisplay.find('.requirement-box');
		var $arrow = $('.pwd-popover').find('.arrow');
		var invalidPass = false;

		$allBoxes.removeClass('valid');
		$arrow.removeClass('valid');
		if(cond.upper) $validationDisplay.find('.upper').addClass('valid');
		if(cond.lower) $validationDisplay.find('.lower').addClass('valid');
		if(cond.num) {
			$validationDisplay.find('.num').addClass('valid');
			$arrow.addClass('valid');
		}
		if(cond.punct) $validationDisplay.find('.punct').addClass('valid');
		if(cond.chars) $validationDisplay.find('.chars').addClass('valid');
		if(!cond.upper || !cond.lower || !cond.num || !cond.punct || !cond.chars) {
			invalidPass = true;
		}
		if(cond.invalidChars) {
			invalidPass = true;
			$('.password-error').text('The password you entered contains an invalid character.');
		} else {
			$('.password-error').text('');
		}

		validationService.changeValidationIcon($input, invalidPass);
	}
}]);
