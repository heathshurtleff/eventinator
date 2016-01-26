/*global angular, google*/

angular.module('eventinator').factory('addressService', function() {
	return {
		autocomplete: null,
		initAutocomplete: function(elementId) {
			this.autocomplete = new google.maps.places.Autocomplete(
				document.getElementById(elementId),
				{types: ['geocode']}
			);
		},
		geolocate: function() {
			var _this = this;
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var geolocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					var circle = new google.maps.Circle({
						center: geolocation,
						radius: position.coords.accuracy
					});
					_this.autocomplete.setBounds(circle.getBounds());
				});
			}
		}
	};
});