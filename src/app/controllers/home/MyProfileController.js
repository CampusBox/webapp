(function() {

    angular
        .module('app')
        .controller('MyProfileController', [
            '$mdDialog',
            '$scope',
            'allDataService',
            '$stateParams',
            '$state',
            MyProfileController
        ]);

    function MyProfileController($mdDialog, $scope, allDataService, $stateParams, $state) {
        var vm = this;
        $scope.tab = $stateParams.tab;
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/partials/completeProfile.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
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
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        // SKILLS CHIP SHIT STARTED

       $scope.readonly = true;
       $scope.removable = false;
       $scope.selectedItem = null;
       $scope.searchText = null;
       $scope.querySearch = querySearch;
       vegetables = loadVegetables();
       $scope.selectedVegetables = [ {
              'name': 'Broccoli'
            },
            {
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
        function querySearch (query) {
            console.log('query funciton called');
          var results = query ?vegetables.filter(createFilterFor(query)) : [];
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
          var veggies = [
            {
              'name': 'Broccoli'
            },
            {
              'name': 'Cabbage'
            },
            {
              'name': 'Carrot'
            },
            {
              'name': 'Lettuce'
            },
            {
              'name': 'Spinach'
            }
          ];

          return veggies.map(function (veg) {
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
        allDataService.get("blog_posts")
            .then(function(blogs) {
                vm.blogs = [].concat(blogs.data)
                console.log("aa");
            });
        allDataService.get("events/Cultural")
            .then(function(events) {
                vm.events = [].concat(events.data)
                console.log("aa");
            });
    }

})();
