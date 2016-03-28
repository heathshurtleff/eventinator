/*global angular,$*/

$(document).ready(function() {
	$.ajax({
		url: '/app/gtfsData',
		data: {type: 'routes'},
		success: function(data) {

		}
	});
});

angular.module('transportinator', ['ui.router', 'ngResource']);