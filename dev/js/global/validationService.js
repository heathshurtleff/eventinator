/*global angular*/

angular.module('eventinator').factory('validationService', [function() {
	return {
		checkFieldStatus: function($input, evt) {
			var prettyName = $input.attr('data-pretty-name');
			var validationMsg = $input.attr('data-content');
			if((evt.type !== 'focus' && $input.val().length > 0) || evt.type === 'jQueryEach') {
				this.changeValidationIcon($input, $input.hasClass('ng-invalid'));
			}

			if($input.hasClass('ng-invalid')) {
				if($input.hasClass('ng-invalid-required') && !$input.hasClass('ng-pristine')) {
					validationMsg = prettyName + ' is required';
				} else if($input.hasClass('ng-invalid-minlength')) {
					validationMsg = prettyName + ' must be at least ' + $input.attr('ng-minlength') + ' characters';
				} else if($input.hasClass('ng-invalid-maxlength')) {
					validationMsg = prettyName + ' must be less than ' + $input.attr('ng-maxlength') + ' characters';
				} else if ($input.hasClass('ng-invalid-email')) {
					validationMsg = 'Invalid email address';
				} else if ($input.hasClass('ng-invalid-datetimelocal')) {
					validationMsg = 'Invlaid date format';
				} else if ($input.hasClass('ng-invalid-future')) {
					validationMsg = prettyName + ' must be in the future';
				} else if ($input.hasClass('ng-invalid-end-before-start')) {
					validationMsg = 'Event must start before it ends';
				}
			} else if ($input.hasClass('ng-valid') && $input.val().length > 0) {
				validationMsg = 'Good to go!';
			}
			this.updatePopoverText($input, validationMsg);
		},
		updatePopoverText: function(input, text) {
			var popoverData = input.data('bs.popover');
			if(popoverData) {
				popoverData.tip().find('.popover-content').text(text);
			}
		},
		changeValidationIcon: function($input, failCondition) {
			var $container = $input.parents('.has-feedback');
			var $feedbackIcon = $container.find('.form-control-feedback');

			if(failCondition) {
				$container.removeClass('has-success');
				$feedbackIcon.removeClass('glyphicon-ok');
				$container.addClass('has-error');
				$feedbackIcon.addClass('glyphicon-remove');
			} else {
				$container.removeClass('has-error');
				$feedbackIcon.removeClass('glyphicon-remove');
				$container.addClass('has-success');
				$feedbackIcon.addClass('glyphicon-ok');
			}
		}
	};
}]);