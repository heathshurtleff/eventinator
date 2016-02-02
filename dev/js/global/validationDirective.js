/*global angular */

angular.module('eventinator')
	.directive('endBeforeStart', function() {
		return {
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl) {
				ctrl.$validators.endBeforeStart = function(modelValue) {
					if(ctrl.$isEmpty(modelValue)) {
						// consider empty models to be valid
						return true;
					}

					if(scope.eventStart) {
						var startTime = new Date(scope.eventStart).getTime();
						var endTime = new Date(modelValue).getTime();
						if(startTime < endTime) {
							return true;
						}
					} else {
						return true;
					}

					return false;
				};
			}
		};
	})
	.directive('futureDate', function() {
		return {
			require: 'ngModel',
			link: function(scope, elem, attrs, ctrl) {
				ctrl.$validators.future = function(modelValue) {
					if(ctrl.$isEmpty(modelValue)) {
						return true;
					}

					var today = new Date();
					var todayTime = today.getTime();
					var dateTime = new Date(modelValue).getTime();

					if(todayTime < dateTime) {
						return true;
					}

					return false;
				};
			}
		};
	});