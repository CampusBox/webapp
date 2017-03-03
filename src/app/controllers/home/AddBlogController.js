(function() {

    angular
        .module('app')
        .controller('AddBlogController', [
            'allDataService',
            '$scope',
            'Upload',
            '$timeout',
            AddBlogController
        ]);

    function AddBlogController(allDataService, $scope, Upload, $timeout) {
        var vm = this;

        vm.tableData = [];

        allDataService.get("blog_posts")
            .then(function(tableData) {
                vm.tableData = [].concat(tableData.data)
            });
        $scope.upload = function(dataUrl, name) {
                Upload.upload({
                    url: 'http://upload.campusbox.org/imageUpload.php',
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
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                });
            }

        // Add tags shit staeted

            $scope.readonly = false;
            $scope.removable = true;
            $scope.selectedItem = null;
            $scope.searchText = null;
            $scope.querySearch = querySearch;
            $scope.vegetables = loadVegetables();
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
               var results = query ?$scope.vegetables.filter(createFilterFor(query)) : [];
               return results;
             }

             /**
              * Create filter function for a query string
              */
             function createFilterFor(query) {
               var lowercaseQuery = angular.lowercase(query);

               return function filterFn(vegetable) {
                 return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ;
                     // (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
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

        // Add tags shit ended
    }

})();
