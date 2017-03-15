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
        $scope.logout = function() {
            console.log("logout");
            localStorage.clear();
            $state.go('static.login');
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

        $scope.searched = function(item) {
            console.log(item.type);
            if (item.type == 'event') {
                $state.go('home.singleEvent', { eventId: item.id });
            }
            if (item.type == 'content') {
                $state.go('home.singleContent', { contentId: item.id });
            }
            if (item.type == 'student') {
                $state.go('home.profile', { username: item.username });
            }
        };

        function showSimpleToast(title) {
            $mdToast.show(
                $mdToast.simple()
                .content(title)
                .hideDelay(2000)
                .position('top right')
            );
        }
        $scope.openSearch = function(q) {
                $location.path('/search').search({ 'q': q });
            }
            //Search Autocomplete start

        var self = this;
        $scope.test = [{
            'name': 'rOHSN',
            'url': 'https://github.com/angular/angular.js',
            'watchers': '3,623',
            'forks': '16,175',
        }];
        $scope.searchData = {};
        $scope.searchData.data = [];
        tokenService.get("search/" + "M")
            .then(function(tableData) {
                $scope.searchData.data = [].concat(tableData);
            });
        $scope.querySearch = querySearch;

        function querySearch(query) {
            console.log(query);
            $timeout(tokenService.get("search/" + query)
                .then(function(tableData) {
                    $scope.searchData = tableData;
                    console.log($scope.searchData.data);
                    return $scope.searchData;
                }), 10000);
        }

        // Search Autocomplete End
    }

})();
