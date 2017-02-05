(function() {

    angular
        .module('app')
        .controller('ProfileController', [
            '$mdDialog',
            '$scope',
            'allDataService',
            ProfileController
        ]);

    function ProfileController($mdDialog, $scope, allDataService) {
        var vm = this;
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
      var self = this;

    self.readonly = true;
    self.removable = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    self.vegetables = loadVegetables();
    self.selectedVegetables = [];
    self.numberChips = [];
    self.numberChips2 = [];
    self.numberBuffer = '';
    self.autocompleteDemoRequireMatch = false;
    self.transformChip = transformChip;
    self.editable = editable;

    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }
    function editable(){
        if (self.readonly) {
            self.readonly = false;
            self.removable = true;
        }else{
            self.readonly = true;
            self.removable = false;
        }
    }
    /**
     * Search for vegetables.
     */
    function querySearch (query) {
      var results = query ? self.vegetables.filter(createFilterFor(query)) : [];
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
          'name': 'Broccoli',
          'type': 'Brassica'
        },
        {
          'name': 'Cabbage',
          'type': 'Brassica'
        },
        {
          'name': 'Carrot',
          'type': 'Umbelliferous'
        },
        {
          'name': 'Lettuce',
          'type': 'Composite'
        },
        {
          'name': 'Spinach',
          'type': 'Goosefoot'
        }
      ];

      return veggies.map(function (veg) {
        veg._lowername = veg.name.toLowerCase();
        veg._lowertype = veg.type.toLowerCase();
        return veg;
      });
    }
        vm.user = {
            title: 'Admin',
            email: 'contact@flatlogic.com',
            firstName: '',
            lastName: '',
            company: 'FlatLogic Inc.',
            address: 'Fabritsiusa str, 4',
            city: 'Minsk',
            state: '',
            biography: 'We are young and ambitious full service design and technology company. ' +
                'Our focus is JavaScript development and User Interface design.',
            postalCode: '220007'
        };
        allDataService.get("blog_posts")
          .then(function(tableData) {
            vm.tableData = [].concat(tableData.data)
          });
    }

})();
