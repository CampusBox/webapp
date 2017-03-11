(function() {

    angular
        .module('app')
        .controller('MyProfileController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$stateParams',
            '$state',
            MyProfileController
        ]);

    function MyProfileController($mdDialog, $scope, tokenService, $stateParams, $state) {
        var vm = this;
        $scope.tab = $stateParams.tab;
        $scope.username = $stateParams.username;
        console.log($scope.tab);
        console.log($scope.username);
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/partials/completeProfile.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };
        $scope.openSocialAccounts = function(ev) {
            $mdDialog.show({
                controller: SocialController,
                templateUrl: 'app/views/partials/socialLinks.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };
        $scope.showParticipants = function(ev) {
            $mdDialog.show({
                controller: 'ParticipantsController',
                templateUrl: 'app/views/partials/showParticipants.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    participants: $scope.events
                },
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };
        $scope.deactivate = function(student) {
            
        };
        // SKILLS CHIP SHIT STARTED

        $scope.readonly = true;
        $scope.removable = false;
        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.querySearch = querySearch;
        vegetables = loadVegetables();
        $scope.selectedVegetables = [{
            'name': 'Broccoli'
        }, {
            'name': 'Cabbage'
        }];
        numberChips = [];
        numberChips2 = [];
        numberBuffer = '';
        $scope.autocompleteDemoRequireMatch = false;
        $scope.transformChip = transformChip;

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
            var results = query ? vegetables.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
                    (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
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

        // SKILLS CHIP SHIT ENDED
        function SocialController() {}

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        tokenService.get("events")
            .then(function(events) {
                $scope.events = events.data;
            });
        tokenService.get("student/" + $scope.username)
            .then(function(student) {
                $scope.student = student.data;
                console.log($scope.student);
            });

    }

})();
