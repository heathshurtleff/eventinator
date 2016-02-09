/*global angular, toastr*/

angular.module('eventinator').factory('toastrService', [function() {

	toastr.options = {
		'positionClass': 'toast-top-center',
		'preventDuplicates': true
	};

	return {
		toast: function(type, message) {
			toastr[type](message);
		}
	};
}]);