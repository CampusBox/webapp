'use strict';

/**
 * @ngdoc directive
 * @name locationApp.directive:placeAutocomplete
 * @description
 *
 * # An element directive that provides a dropdown of
 * location suggestions based on the search string.
 * When an item is selected, the location's latitude
 * and longitude are determined.
 * 
 * This directive depends on the Google Maps API
 * with the places library
 * 
 * <script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
 * 
 * Usage:
 * <place-autocomplete ng-model="selectedLocation"></place-autocomplete>
 *
 * Credit:
 * http://stackoverflow.com/a/31510437/293847
 */
// * <script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
angular.module('angularMaterialAdmin')
    .directive('placeAutocomplete', function() {
        return {
            templateUrl: 'app/views/partials/place-autocomplete.html',
            restrict: 'E',
            replace: true,
            scope: {
                'ngModel': '='
            },
            controller: function($scope, $q) {
                if (!google || !google.maps) {
                    throw new Error('Google Maps JS library is not loaded!');
                } else if (!google.maps.places) {
                    throw new Error('Google Maps JS library does not have the Places module');
                }
                var autocompleteService = new google.maps.places.AutocompleteService();
                var map = new google.maps.Map(document.createElement('div'));
                var placeService = new google.maps.places.PlacesService(map);
                $scope.ngModel = {};

                /**
                 * @ngdoc function
                 * @name getResults
                 * @description
                 *
                 * Helper function that accepts an input string
                 * and fetches the relevant location suggestions
                 *
                 * This wraps the Google Places Autocomplete Api
                 * in a promise.
                 *
                 * Refer: https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
                 */
                var getResults = function(address) {
                    var deferred = $q.defer();
                    autocompleteService.getQueryPredictions({
                        input: address
                    }, function(data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise;
                };

                /**
                 * @ngdoc function
                 * @name getDetails
                 * @description
                 * Helper function that accepts a place and fetches
                 * more information about the place. This is necessary
                 * to determine the latitude and longitude of the place.
                 *
                 * This wraps the Google Places Details Api in a promise.
                 *
                 * Refer: https://developers.google.com/maps/documentation/javascript/places#place_details_requests
                 */
                var getDetails = function(place) {
                    var deferred = $q.defer();
                    placeService.getDetails({
                        'placeId': place.place_id
                    }, function(details) {
                        deferred.resolve(details);
                    });
                    return deferred.promise;
                };

                $scope.search = function(input) {
                    if (!input) {
                        return;
                    }
                    return getResults(input).then(function(places) {
                        return places;
                    });
                };
                /**
                 * @ngdoc function
                 * @name getLatLng
                 * @description
                 * Updates the scope ngModel variable with details of the selected place.
                 * The latitude, longitude and name of the place are made available.
                 *
                 * This function is called every time a location is selected from among
                 * the suggestions.
                 */
                $scope.getLatLng = function(place) {
                    if (!place) {
                        $scope.ngModel = {};
                        return;
                    }
                    getDetails(place).then(function(details) {
                        console.log(details);
                        console.log(details.types[0]);
                        console.log(details.address_components[0]);
                        console.log(details.adr_address);

                        var googlePlace = {};

                        googlePlace.id = details.id;
                        googlePlace.type = details.types[0];
                        googlePlace.city = details.address_components[0].long_name;
                        googlePlace.address = details.adr_address;
                        googlePlace.name = place.description;
                        $scope.ngModel = googlePlace;
                    });
                }
            }
        };
    });
