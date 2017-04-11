(function() {

    angular
        .module('app')
        .controller('SearchStudentsController', [
            '$scope', '$timeout', '$q', 'tokenService', '$stateParams','$state',
            SearchController
        ]);

    function SearchController($scope, $timeout, $q, tokenService, $stateParams, $state) {
        var vm = this;
        $scope.tests = 'test';
        $scope.listLoading = true;
        $scope.events = {};
        $scope.query = $stateParams.query;
        $scope.searchText = $stateParams.query;
        $scope.searchTypes = [{
            'title': 'events',
            'icon': 'calendar'
        }, {
            'title': 'creativity',
            'icon': 'all-inclusive'
        }, {
            'title': 'students',
            'icon': 'school'
        }];
        $scope.followers = [{
            'name': 'Rohan Goel',
            'image': 'https://avatars2.githubusercontent.com/u/14099191?v=3&u=e03e9a657eb1e4de7da062cc5a5611092f0f2d7e&s=400',
            'about': 'Hello there i do this',
            'college': 'Thapar University',
            'skills': ['angularjs', 'nodejs', 'anal', 'raddish', 'fisting']
        }, {
            'name': 'Rohan Goel',
            'image': 'https://avatars3.githubusercontent.com/u/6951276?v=3&s=400',
            'about': 'Hello there i do this',
            'college': 'Thapar University',
            'skills': ['cabbage', 'anal', 'missionary']
        }];
        $scope.searched = function(item, text) {
            console.log(item);
            if (item == 'events') {
                $state.go('home.searchEvents', { query: text });
            } else if (item == 'creativity') {
                $state.go('home.searchCreativity', { query: text });
            } else if (item == 'students') {
                $state.go('home.searchStudents', { query: text });
            }
        };
        $scope.follow = function($event, index) {
            $event.stopPropagation();
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
        };
        tokenService.get("search/students/" + $scope.query)
            .then(function(tableData) {
        $scope.listLoading = false;
                $scope.students = tableData.data;
                console.log($scope.students);
            });
    }
})();
