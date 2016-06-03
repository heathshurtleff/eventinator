/*global angular, _, $, Promise */

angular.module('transportinator').controller('routeInfoController', ['$scope', '$filter', '$stateParams', 'routesService', function($scope, $filter, $stateParams, routesService) {
	var $allTimes = $('.route-times-table td');
	$scope.routeId = $stateParams.id;
	$scope.hasRealtimeAccess = (parseInt($stateParams.id) <= 6 && $stateParams.id.indexOf('X') === -1);

	$scope.getStops = function() {
		routesService.getStopsForRoute($scope.routeId, $scope.tripDirection).then(function(stops) {
			$scope.$apply(function() {
				$scope.stops = stops;
				getTripsData();
			});
		});
	};

	$scope.getAvailableEndStops = function() {
		var endStopsArray;
		var startIndex = _.findIndex($scope.stops, function(stop) {
			return stop.stop_id === $scope.tripStart;
		});
		endStopsArray = _.rest($scope.stops, startIndex + 1);
		$scope.endStops = endStopsArray;
		$('.route-times-table th').each(function(idx, th) {
			var $th = $(th);
			if($th.attr('data-stop-id') !== $scope.tripStart) {
				$th.hide();
			} else {
				$th.show();
			}
		});
		$('.route-times-table td').each(function(idx, td) {
			var $td = $(td);
			if($td.attr('data-stop-id') !== $scope.tripStart) {
				$td.hide();
			} else {
				$td.show();
			}
		});
	};

	$scope.displayStopTimes = function() {
		$('.route-times-table th').each(function(idx, th) {
			var $th = $(th);
			if($th.attr('data-stop-id') !== $scope.tripStart && $th.attr('data-stop-id') !== $scope.tripEnd) {
				$th.hide();
			} else {
				$th.show();
			}
		});
		$('.route-times-table td').each(function(idx, td) {
			var $td = $(td);
			if($td.attr('data-stop-id') !== $scope.tripStart && $td.attr('data-stop-id') !== $scope.tripEnd) {
				$td.hide();
			} else {
				$td.show();
			}
		});
	};

	function getTripsData() {
		var rawTrips;
		routesService.getTripsForRoute($scope.routeId, $scope.tripDirection).then(function(trips) {
			rawTrips = trips;
			fecthStoptimesPerTrip().then(function() {
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
								newStopArray[idx] = {stop_id: stop.stop_id, departure_time: '--'};
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
		});

		var currentIndex = 0;
		function fecthStoptimesPerTrip() {
			var complete, error;

			var p = new Promise(function(resolve, reject) {
				complete = resolve;
				error = reject;
			});

			function getStopTimes(trip) {
				currentIndex++;
				if(trip) {
					routesService.getStopTimesByTrip(trip.trip_id).then(function(response) {
						trip.stoptimes = response;
						getStopTimes(rawTrips[currentIndex]);
					}).catch(function(err) {
						error(err);
					});
				} else {
					complete();
				}
			}

			getStopTimes(rawTrips[currentIndex]);

			return p;
		}
	}

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