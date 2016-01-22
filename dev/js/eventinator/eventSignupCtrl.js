/*global angular,$*/

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

		// authService.createEvtUser(newUser).then(function() {
		// 	//TODO: User Feedback
		// 	$location.path('/');
		// }, function(excuse) {
		// 	$('.full-form-error').text(excuse);
		// });
	};

	var $inputs = $('#eventSignUpForm input[id!="password"]');
	var $pass = $('#password');

	$pass.popover({
		container: 'body',
		content: '<div class="pass-confirm-container"><div class="requirement-box upper">A</div><div class="requirement-box lower">a</div><div class="requirement-box num">0-9</div><div class="requirement-box punct">!&amp;?</div><div class="requirement-box chars">8+</div></div>',
		html: true,
		placement: 'top',
		trigger: 'focus',
		template: '<div class="popover pwd-popover"><div class="arrow"></div><div class="popover-content"></div></div>'
	});

	$(function() {
		$('[data-toggle=popover]').popover();
	});
	$inputs.on('keyup blur', function() {
		var $input = $(this),
			$container = $input.parents('.has-feedback'),
			$feedbackIcon = $container.find('.form-control-feedback');

		if($input.hasClass('ng-invalid')) {
			$container.addClass('has-error');
			$feedbackIcon.addClass('glyphicon-remove');
			if($input.hasClass('ng-invalid-required')) {
				updatePopoverText($input, 'Your ' + $input.attr('id') + ' is required');
			} else if($input.hasClass('ng-invalid-minlength')) {
				updatePopoverText($input, 'Must be at least ' + $input.attr('ng-minlength') + ' characters');
			} else if ($input.hasClass('ng-invalid-email')) {
				updatePopoverText($input, 'Invalid email address');
			}
		} else if ($input.hasClass('ng-valid')) {
			$container.removeClass('has-error');
			$feedbackIcon.removeClass('glyphicon-remove');
			$container.addClass('has-success');
			$feedbackIcon.addClass('glyphicon-ok');
			//updatePopoverText($input, 'Nice to meet you ' + $scope.fullName + '!');
			updatePopoverText($input, 'Looks good!');
		}
		//console.log($input);
	});

	$pass.on('focus keyup', function() {
		passwordValidator($(this));
	});

	function passwordValidator($input) {
		var pwdVal = $input.val();
		var passedConditions = {
			upper: pwdVal.search(/[A-Z]/g) > -1,
			lower: pwdVal.search(/[a-z]/g) > -1,
			num: pwdVal.search(/[0-9]/g) > -1,
			punct: pwdVal.search(/[!#$@_'+,?\[\].-]/g) > -1,
			chars: pwdVal.length >= 8
		};

		changeDisplay(passedConditions);
	}

	function changeDisplay(cond) {
		var $validationDisplay = $('.pass-confirm-container');
		var $allBoxes = $validationDisplay.find('.requirement-box');
		var $arrow = $('.pwd-popover').find('.arrow');

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
	}

	function updatePopoverText(input, text) {
		var popoverData = input.data('bs.popover');
		popoverData.tip().find('.popover-content').text(text);
	}
}]);
