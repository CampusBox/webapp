'use strict';

(function() {

    angular
        .module('app')
        .controller('MainController', [
            'navService', '$mdSidenav', 'tokenService', '$mdDialog', '$log', '$q', '$timeout', '$state', '$mdToast', '$scope', '$localStorage', '$location',
            MainController
        ]);

    function MainController(navService, $mdSidenav, tokenService, $mdDialog, $log, $q, $timeout, $state, $mdToast, $scope, $localStorage, $location) {
        var vm = this;
        tokenService.get("notifications")
            .then(function(response) {

                $scope.notifications = response;
            });
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
        $scope.logout = function() {
            console.log("logout");
            localStorage.clear();
            $state.go('static.login');
        };

        $scope.addUpdate = function() {
                $mdDialog.show({
                    controller: AddUpdateController,
                    templateUrl: 'app/views/partials/addUpdate.html',
                    parent: angular.element(document.body),
                    scope: $scope,
                    preserveScope: true,
                    escapeToClose: true,

                    clickOutsideToClose: true,
                    controllerAs: 'dc'
                }).then(function(media) {
                    $scope.progress = 2;
                    
                    console.log('if');
                    
                }, function() {
                    console.log('else');
                });
            };

            function AddUpdateController($mdDialog, $scope, Upload, $timeout) {
                $scope.error = '';
                $scope.url = '';
                $scope.mediaType = "";

                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.submitUrl = function(url) {
                    $scope.url = url;
                    console.log($scope.url);
                            $scope.error = '';
                            $scope.item = {};
                            var videoid = $scope.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                            if (videoid != null) {
                                $scope.item.mediaType = "youtube";
                                $scope.item.embedUrl = "//www.youtube.com/embed/" + videoid[1];
                                $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl);
                                $mdDialog.hide($scope.item);
                            } else {
                                $scope.error = 'Invalid youtube url';
                                console.log('Invalid youtube url');
                            }
                };
                $scope.validateSoundcloud = function(url) {
                    var regexp = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
                    return url.match(regexp) && url.match(regexp)[2]
                };
                $scope.validateUrl = function(url) {
                    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                    if (res == null)
                        return false;
                    else
                        return true;
                };
            }

        var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';
        $scope.user = $localStorage.user;
        vm.menuItems = [];
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

      
        $scope.searched = function(item) {
            if (item.type == 'event') {
                $state.go('home.singleEvent', { eventId: item.id });
            }else if (item.type == 'content') {
                $state.go('home.singleContent', { contentId: item.id });
            }else if (item.type == 'student') {
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

        $scope.test = [{
            'name': 'rOHSN',
            'url': 'https://github.com/angular/angular.js',
            'watchers': '3,623',
            'forks': '16,175',
        }];

        // Search Autocomplete End
    }

})();
