(function() {

'use strict';
angular.module('app')
  .directive('placeAutocomplete', function() {
    return {
      template: '<div id="place-autocomplete">                      <md-autocomplete md-no-cache="false" md-selected-item="location" md-selected-item-change="getLatLng(item)" ng-model-options="{debounce: 600}" md-search-text-change="search(searchText)" md-search-text="searchText" md-items="item in search(searchText)" md-item-text="item.description" md-min-length="2" md-max-length="50" md-floating-label="Location (place, city or region)">                        <md-item-template>                          <span md-highlight-text="searchText" md-highlight-flags="^i"> {{item.description}}</span>                        </md-item-template>                        <md-not-found>                          No matches found for "{{searchText.description}}".                        </md-not-found>                      </md-autocomplete>                    </div>',
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
            $scope.ngModel = {
              'name': place.description,
              'latitude': details.geometry.location.lat(),
              'longitude': details.geometry.location.lng(),
            };
          });
        }
      }
    };
  });
});