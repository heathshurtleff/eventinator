/*global angular,$*/

angular.module('eventinator').controller('eventSignupCtrl', ['$scope', '$location', 'eventUser', 'authService', function($scope, $location, eventUser, authService) {
	$scope.validForm = true;
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

		// authService.createEvtUser(newUser).then(function() {
		// 	//TODO: User Feedback
		// 	$location.path('/');
		// }, function(excuse) {
		// 	$('.full-form-error').text(excuse);
		// });
	};

	var $inputs = $('#eventSignUpForm input[id!="password"]');
	var $pass = $('#password');
	var $confPass = $('#confPass');

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
	$inputs.on('keyup blur', function() {
		var $input = $(this);

		changeValidationIcon($input, $input.hasClass('ng-invalid'));
		if($input.hasClass('ng-invalid')) {
			if($input.hasClass('ng-invalid-required')) {
				updatePopoverText($input, 'Your ' + $input.attr('id') + ' is required');
			} else if($input.hasClass('ng-invalid-minlength')) {
				updatePopoverText($input, 'Must be at least ' + $input.attr('ng-minlength') + ' characters');
			} else if ($input.hasClass('ng-invalid-email')) {
				updatePopoverText($input, 'Invalid email address');
			}
		} else if ($input.hasClass('ng-valid')) {
			updatePopoverText($input, 'Looks good!');
		}
		//console.log($input);
	});

	$pass.on('focus keyup', function() {
		passwordValidator($(this));
	});

	$confPass.on('focus keyup blur', function() {
		var $input = $(this);

		changeValidationIcon($input, $scope.password !== $scope.confPass);
		if($scope.password !== $scope.confPass) {
			updatePopoverText($input, 'You passwords must match');
		} else {
			updatePopoverText($input, 'We have a match!');
		}
	});

	function passwordValidator($input) {
		var pwdVal = $input.val();
		var passedConditions = {
			upper: pwdVal.search(/[A-Z]/g) > -1,
			lower: pwdVal.search(/[a-z]/g) > -1,
			num: pwdVal.search(/[0-9]/g) > -1,
			punct: pwdVal.search(/[!#$@_'+,?\[\].-]/g) > -1,
			chars: pwdVal.length >= 8,
			invalidChars: pwdVal.search(/[^A-z0-9\!\@\#\$\%\^\&\*]/g) > -1
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

		changeValidationIcon($input, invalidPass);
	}

	function updatePopoverText(input, text) {
		var popoverData = input.data('bs.popover');
		popoverData.tip().find('.popover-content').text(text);
	}

	function changeValidationIcon($input, failCondition) {
		var $container = $input.parents('.has-feedback');
		var $feedbackIcon = $container.find('.form-control-feedback');

		if(failCondition) {
			$scope.validForm = false;
			$container.removeClass('has-success');
			$feedbackIcon.removeClass('glyphicon-ok');
			$container.addClass('has-error');
			$feedbackIcon.addClass('glyphicon-remove');
		} else {
			$scope.validForm = true;
			$container.removeClass('has-error');
			$feedbackIcon.removeClass('glyphicon-remove');
			$container.addClass('has-success');
			$feedbackIcon.addClass('glyphicon-ok');
		}
	}
}]);
