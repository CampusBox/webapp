'use strict';

(function() {

    angular
        .module('app')
        .controller('MainController', [
            'navService', '$mdSidenav', 'tokenService', '$mdMedia', '$mdDialog', '$log', '$q', '$timeout', '$state', '$mdToast', '$scope', '$localStorage', '$location', '$mdConstant', '$rootScope',
            MainController
        ]);

    function MainController(navService, $mdSidenav, tokenService, $mdMedia, $mdDialog, $log, $q, $timeout, $state, $mdToast, $scope, $localStorage, $location, $mdConstant, $rootScope) {
        var vm = this;

        if (typeof document.getElementById('basicveryimportantloading') !== 'undefined' && document.getElementById('basicveryimportantloading') != null) {
            document.getElementById('basicveryimportantloading').remove();
        }

        var semicolon = 186;
        $rootScope.gray = '#fbfcfd';

        $scope.customKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, semicolon];

        $scope.hideBottomBar = $mdMedia('(max-height: 400px)');

        $scope.$watch(function() {
            return $mdMedia('(max-height: 400px)');
        }, function(val) {
            $scope.hideBottomBar = val;
        });

        $rootScope.screenIsSmall = $mdMedia('sm') || $mdMedia('xs');

        $scope.$watch(function() {
            return ($mdMedia('sm') || $mdMedia('xs'));
        }, function(small) {
            $rootScope.screenIsSmall = small;
        });

        $scope.logout = function(ev) {
            localStorage.clear();
            $rootScope.token = null;
            $rootScope.authenticated = false;
            $rootScope.user = {};

            var confirm = $mdDialog.confirm()
                .title('You have been logged out successfully.')
                .ariaLabel('Logged out successfully.')
                .targetEvent(event)
                .ok('Okay');
            $mdDialog.show(confirm).then(function() {
                $state.go('home.dashboard');
            });

        };


        $scope.gotoState = function(state) {
            $location.url(state);
        };

        vm.menuItems = [];
        vm.title = $state.current.data.title;
        vm.toggleRightSidebar = toggleRightSidebar;
        if ($rootScope.authenticated) {

            tokenService.get("userImage")
                .then(function(response) {
                    $rootScope.user = response;
                    tokenService.get("notifications")
                        .then(function(abc) {
                            $rootScope.notifications = abc;

                        });
                });
        }
        navService
            .loadAllItems()
            .then(function(menuItems) {
                vm.menuItems = [].concat(menuItems);
            });

        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }
        $scope.searchedFast = function(text) {
            console.log(text);
            $state.go('home.searchAll', { query: text });
        };

        function showSimpleToast(title) {
            $mdToast.show(
                $mdToast.simple()
                .content(title)
                .hideDelay(2000)
                .position('bottom right')
            );
        }
        showSimpleToast('ajhsahksh');


        $scope.NotificationItemClicked = function(notification) {

            if (notification.type == 'follower') {
                $state.go('home.profile', { 'username': notification.follower_username });
            } else if (notification.type == 'event_rsvps') {
                // 
            } else if (notification.type == 'content_appreciate') {
                $state.go('home.singleContent', { 'contentId': notification.content_id });
                // 
            }
            toggleRightSidebar();

        }

    }

})();