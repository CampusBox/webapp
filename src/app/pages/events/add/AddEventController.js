'use strict';

(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('AddEventController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$timeout',
            '$state',
            '$rootScope',
            AddEventController
        ]);

    function AddEventController($mdDialog, $scope, tokenService,$timeout, $state,$rootScope) {
        $scope.event = {};
        $scope.event.venue = null;
        $scope.event.fromDate = new Date();
        $scope.place = null;
        $scope.loading = false;
        $rootScope.currentPageBackground = $rootScope.gray;
        $rootScope.title = "New Event";

                $rootScope.currentMenu = 'add';


        $scope.tutorial = false;
        $scope.types = [
            { 'id': 1, 'title': 'Competition', },
            { 'id': 2, 'title': 'Conference', },
            { 'id': 3, 'title': 'Exhibition', },
            { 'id': 4, 'title': 'Performance', },
            { 'id': 5, 'title': 'Workshop', },
            { 'id': 6, 'title': 'Seminar', },
            { 'id': 7, 'title': 'Other', }
        ];
        $scope.audiences = [
            { 'id': '0', 'title': 'My college' },
            { 'id': '1', 'title': 'Everyone ' }
        ];

        $scope.consoleTag = function(tags) {
            console.log(tags);
        };
        $scope.gotIt = function() {
            $scope.tutorial = true;
        };
     

        //Tags code start
        // Add tags shit staeted
        $scope.readonly = false;
        $scope.removable = true;
        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.querySearch = querySearch;
        $scope.vegetables = loadVegetables();
        $scope.tags = [];
        var numberChips = [];
        var numberChips2 = [];
        var numberBuffer = '';
        $scope.autocompleteDemoRequireMatch = false;
        $scope.transformChip = transformChip;
        $scope.body = {};
        
        $scope.submitEvent = function(event, tags) {
            event.id = event.venue.id;
            event.loc_type = event.venue.type;
            event.city = event.venue.city;
            event.address = event.venue.address;
            event.venue = event.venue.name;
            $scope.body.event = event;

            $scope.body.tags = tags;
            $scope.loading = true;
            tokenService.post("addEvent", $scope.body)
                .then(function(abc) {
                    $state.go('home.dashboard');
                    console.log(abc);
                }).catch(function(abc) {
                    $state.go('home.dashboard');
                    console.log(abc);
                });
        };

        $scope.max = 3;
        $scope.selectedIndex = 0;
        $scope.nextTab = function() {
            var index = ($scope.selectedIndex == $scope.max) ? 0 : $scope.selectedIndex + 1;
            $scope.selectedIndex = index;

        };

        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip }
        }

        /**
         * Search for vegetables.
         */
        function querySearch(query) {
            console.log('query funciton called');
            var results = query ? $scope.vegetables.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0);
                // (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
            };

        }

        function loadVegetables() {
            var veggies = [{
                'name': 'Broccoli'
            }, {
                'name': 'Cabbage'
            }, {
                'name': 'Carrot'
            }, {
                'name': 'Lettuce'
            }, {
                'name': 'Spinach'
            }];

            return veggies.map(function(veg) {
                veg._lowername = veg.name.toLowerCase();
                return veg;
            });
        }
        $scope.skillsEdit = function() {
            $scope.readonly = !$scope.readonly;
            $scope.removable = !$scope.removable;
        }

        // Add tags shit ended
        // Tags code end

    }
})();
