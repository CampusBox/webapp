(function() {

    angular
        .module('app')
        .controller('SearchAllController', [
            '$scope',
            'tokenService',
            '$stateParams',
            '$state',
            '$rootScope',
            '$sce',
            '$filter',
            'creativityCategories',
            SearchAllController
        ]);

    function SearchAllController($scope, tokenService, $stateParams, $state, $rootScope, $sce, $filter, creativityCategories) {
        var vm = this;
        $rootScope.currentMenu = 'search';

        $scope.searchTypes = [];
        $scope.nonFinalContents = [];
        $scope.finalContents = [];

        $scope.listLoading = true;
        $scope.query = $stateParams.query;

        $scope.searchText = $stateParams.query;
        vm.currentNavItem = "students";

        $scope.types = creativityCategories.types;
        $scope.mediaTypes = [4, 5, 6, 7, 12, 15, 16];

        $scope.searched = function(item, text) {
            if (item == 'events') {
                $state.go('home.searchEvents', { query: text });
            } else if (item == 'creativity') {
                $state.go('home.searchCreativity', { query: text });
            } else if (item == 'students') {
                $state.go('home.searchStudents', { query: text });
            } else if (item == 'searchAll') {
                $state.go('home.searchAll', { query: text });

            }
        };
        $scope.searchedFast = function(text) {
            $state.go('home.searchAll', { query: text });
        };

        var flexOrder = function(length) {
            if (length > 10) {
                return (10 + (length % 10));
            } else {
                return length;
            }
        };
        if ($stateParams.query == "") {
            $scope.listLoading = false;
        } else {
            tokenService.get("search/" + $scope.query)
                .then(function(tableData) {
                    console.log(tableData);
                    $scope.listLoading = false;


                    if (tableData.students.data != 'undefined') {
                        $scope.students = tableData.students.data;
                        $scope.fos = flexOrder($scope.students.length);
                    }
                    if (tableData.content.data != 'undefined') {
                        $scope.contents = tableData.content.data;
                        $scope.foc = flexOrder($scope.contents.length);
                        $scope.finalContents = $scope.finalContents.concat($scope.contents);
                    }
                    if (tableData.event.data != 'undefined') {
                        $scope.events = tableData.event.data;
                        $scope.foe = flexOrder($scope.events.length);
                    }
                });
        }
    }
})();
