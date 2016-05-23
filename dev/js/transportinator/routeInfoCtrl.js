/*global angular, _, $ */

angular.module('transportinator').controller('routeInfoController', ['$scope', '$filter', '$stateParams', 'routesService', function($scope, $filter, $stateParams, routesService) {
	var $allTimes = $('.route-times-table td');
	$scope.routeId = $stateParams.id;
	$scope.hasRealtimeAccess = (parseInt($stateParams.id) <= 6 && $stateParams.id.indexOf('X') === -1);

	routesService.getStopsForRoute($scope.routeId).then(function(stops) {
		$scope.$apply(function() {
			$scope.stops = stops;
		});
	});
	routesService.getTripsForRoute($scope.routeId).then(function(trips) {
		var routeStops = $scope.stops.length;
		var sortedTrips = _.sortBy(trips, function(trip) {
			return trip.stoptimes[0].departure_time;
		});
		_.each(sortedTrips, function(trip) {
			var newStopArray = [];
			if(trip.stoptimes.length !== routeStops) {
				_.each($scope.stops, function(stop, idx) {
					var matchingStoptime = _.find(trip.stoptimes, function(stoptime) {
						return stoptime.stop_id === stop.stop_id;
					});
					if(matchingStoptime) {
						newStopArray[idx] = matchingStoptime;
					} else {
						newStopArray[idx] = {departure_time: '--'};
					}
				});
				trip.stoptimes = newStopArray;
			}
		});
		$scope.$apply(function() {
			$scope.trips = sortedTrips;
			if($scope.hasRealtimeAccess) getRouteUpdate();
		});
	});


	function getRouteUpdate() {
		routesService.getRouteUpdate($scope.routeId).then(function(updateData) {
			$scope.$apply(function() {
				$scope.lastUpdate = updateData.timestamp;
			});
			$allTimes.removeClass('updated-time');
			_.each(updateData.entities, function(entity) {
				var update;
				var tripId;
				var $tripRow;
				if(entity.trip_update) {
					update = entity.trip_update;
					tripId = update.trip.trip_id;
					$tripRow = $('tr[data-trip-id*="' + tripId + '"]');
					_.each(update.stop_time_update, function(stoptime) {
						var $stopToUpdate = $tripRow.find('td[data-stop-id="' + stoptime.stop_id + '"]');
						var today = new Date();
						var estTimezoneOffset = 480;
						var timezoneOffset = estTimezoneOffset - today.getTimezoneOffset();
						var newTime;
						var formattedTime;
						if(stoptime.departure) {
							newTime = new Date((stoptime.departure.time.low * 1000) + (timezoneOffset * 60 * 1000));
							formattedTime = $filter('date')(newTime, 'HH:mm:ss');
							$stopToUpdate.addClass('updated-time');
							$stopToUpdate.text(formattedTime);
						}
					});
				}
			});
			setTimeout(getRouteUpdate, 6000);
		});
	}
}]);