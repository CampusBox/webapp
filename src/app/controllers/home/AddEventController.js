'use strict';

(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('AddEventController', [
            '$mdDialog',
            '$scope',
            'Upload',
            '$timeout',
            AddEventController
        ]);

    function AddEventController($mdDialog, $scope, tokenService, Upload, $timeout) {
        $scope.event = {};
        $scope.place = null;

        $scope.types = [
            { 'id': '1', 'title': 'Dancing' },
            { 'id': '1', 'title': 'Acting' },
            { 'id': '1', 'title': 'Debating' },
            { 'id': '1', 'title': 'Film Making' },
            { 'id': '1', 'title': 'Music' },
            { 'id': '1', 'title': 'Photography' }
        ];
$scope.categories = [
            { 'id': '1', 'title': 'Dancing' },
            { 'id': '1', 'title': 'Acting' },
            { 'id': '1', 'title': 'Debating' },
            { 'id': '1', 'title': 'Film Making' },
            { 'id': '1', 'title': 'Music' },
            { 'id': '1', 'title': 'Photography' }
        ];

        $scope.consoleTag = function(tags) {
            console.log(tags);
        };
        //IMAGE UPLOAD CODE START
        $scope.upload = function(dataUrl, name) {
            Upload.upload({
                url: 'https://upload.campusbox.org/imageUpload.php',
                method: 'POST',
                file: Upload.dataUrltoBlob(dataUrl, name),
                data: {
                    'targetPath': './media/'
                },
            }).then(function(response) {
                $timeout(function() {
                    $scope.result = response.data;
                });
            }, function(response) {
                if (response.status > 0) {
                    $scope.errorMsg = response.status + ': ' + response.data;

                }
            }, function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        };
        //IMAGE UPLOAD CODE END

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
            $scope.body.event = event;
            $scope.body.tags = tags;

            tokenService.post("addEvent", $scope.body)
                .then(function(abc) {
                    console.log(abc);
                }).catch(function(abc) {
                    console.log(abc);
                });
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