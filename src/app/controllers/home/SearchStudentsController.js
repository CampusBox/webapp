(function() {

    angular
        .module('app')
        .controller('SearchStudentsController', [
            '$scope', '$timeout', '$q', 'tokenService', '$stateParams', '$state', '$rootScope',
            SearchController
        ]);

    function SearchController($scope, $timeout, $q, tokenService, $stateParams, $state, $rootScope) {
        var vm = this;
        vm.currentNavItem = "students";
        $scope.searchedFast = function(text) {
             $state.go('home.searchStudents', { query: text });
        };

        $scope.tests = 'test';
        $scope.listLoading = true;
        $scope.events = {};
        $scope.query = $stateParams.query;

        $scope.searchText = $stateParams.query;
        $scope.searchTypes = [];
        $scope.searched = function(item, text) {
            console.log(item);
            if (item == 'events') {
                $state.go('home.searchEvents', { query: text });
            } else if (item == 'creativity') {
                $state.go('home.searchCreativity', { query: text });
            } else if (item == 'students') {
                $state.go('home.searchStudents', { query: text });
            } else if(item == 'searchAll'){
                $state.go('home.searchAll', { query: text });

            }
        };
        $scope.follow = function($event, index) {
                $event.stopPropagation();
            if ($rootScope.authenticated) {
                console.log('follow called');
                if ($scope.students[index].following) {
                    tokenService.delete('studentFollow/' + $scope.students[index].username).then(function(result) {
                        if (result.status != 'error') {
                            console.log(result.status);
                            $scope.students[index].following = !$scope.students[index].following;
                        } else {
                            console.log(result);
                        }
                    });
                } else {

                    tokenService.post('studentFollow/' + $scope.students[index].username).then(function(result) {
                        console.log('post request');
                        if (result.status != 'error') {
                            $scope.students[index].following = !$scope.students[index].following;
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.follow($event, index);
                });
            }
        };
        if ($stateParams.query == "") {

            $scope.listLoading = false;
        } else {

            tokenService.get("search/students/" + $scope.query)
                .then(function(tableData) {
                    $scope.listLoading = false;
                    $scope.students = tableData.data;
                    console.log($scope.students);
                });
        }
    }
})();
