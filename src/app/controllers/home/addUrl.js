(function() {

    angular
        .module('app')
        .controller('AddUrlController', [
            '$scope',
            '$sce',
            '$timeout',
            AddUrlController
        ]);

    function AddUrlController($scope, $sce, $timeout) {
        // add tags start
        $scope.transformChip = transformChip;
        $scope.querySearch = querySearch;

        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { name: chip }
        }

        function querySearch(query) {
            console.log('query funciton called');
            var results = query ? $scope.skills.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(skill) {
                return (skill._lowername.indexOf(lowercaseQuery) === 0);
                // (skill._lowertype.indexOf(lowercaseQuery) === 0);
            };

        }

        $scope.selectedSkills = [{
            'name': 'Broccoli'
        }, {
            'name': 'Cabbage'
        }];

        function loadSkills() {
            var skills = [{
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

            return skills.map(function(veg) {
                veg._lowername = veg.name.toLowerCase();
                return veg;
            });
        };

        // add tags end

    }

})();
