'use strict';
(function() {

    angular
        .module('app')
        .controller('MainController', [
            'navService', '$mdSidenav', 'tokenService', '$mdBottomSheet', '$log', '$q', '$timeout', '$state', '$mdToast', '$scope', '$localStorage', '$location',
            MainController
        ]);

    function MainController(navService, $mdSidenav, tokenService, $mdBottomSheet, $log, $q, $timeout, $state, $mdToast, $scope, $localStorage, $location) {
        var vm = this;
        $scope.logout = function(newState) {
            $localStorage.authenticated = false;
            event.preventDefault();
            $state.go('static.login', { location: 'replace' })
        };
        var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';
        $scope.user = $localStorage.user;
        vm.menuItems = [];
        vm.selectItem = selectItem;
        vm.toggleItemsList = toggleItemsList;
        vm.showActions = showActions;
        vm.title = $state.current.data.title;
        vm.toggleRightSidebar = toggleRightSidebar;

        navService
            .loadAllItems()
            .then(function(menuItems) {
                vm.menuItems = [].concat(menuItems);
            });

        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }

        function toggleItemsList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function() {
                $mdSidenav('left').toggle();
            });
        }

        function selectItem(item) {
            vm.title = item.name;
            vm.toggleItemsList();
        }

        function showActions($event) {
            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: 'app/views/partials/bottomSheet.html',
                controller: ['$mdBottomSheet', SheetController],
                controllerAs: "vm",
                bindToController: true,
                targetEvent: $event
            }).then(function(clickedItem) {
                clickedItem && $log.debug(clickedItem.name + ' clicked!');
            });

            function SheetController($mdBottomSheet) {
                var vm = this;

                vm.actions = [
                    { name: 'Share', icon: 'share', url: 'https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc' },
                    { name: 'Star', icon: 'star', url: 'https://github.com/flatlogic/angular-material-dashboard/stargazers' }
                ];

                vm.performAction = function(action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }

        function showSimpleToast(title) {
            $mdToast.show(
                $mdToast.simple()
                .content(title)
                .hideDelay(2000)
                .position('bottom right')
            );
        }
        $scope.openSearch = function(q) {
                $location.path('/search').search({'q':q});
            }
            //Search Autocomplete start

        var self = this;
        $scope.test = [{
            'name': 'rOHSN',
            'url': 'https://github.com/angular/angular.js',
            'watchers': '3,623',
            'forks': '16,175',
        }];
        $scope.searchData = [];
        tokenService.get("search/"+"a")
            .then(function(tableData) {
                $scope.searchData = [].concat(tableData.data);
            });
        $scope.querySearch = querySearch;

        function querySearch(query) {
            tokenService.get("search/" + query)
                .then(function(tableData) {
                    $scope.searchData = tableData.data;
                    console.log($scope.searchData);
                    return $scope.searchData;
                });
        }

        // Search Autocomplete End
    }

})();
