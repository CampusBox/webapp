(function() {

    angular
        .module('app')
        .controller('DashboardController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$location',
            '$mdMedia',
            '$sce',
            '$filter',
            '$state',
            '$rootScope',
            '$stateParams',
            'creativityCategories',
            'creativityActionsService',
            DashboardController
        ]);

    function DashboardController($mdDialog, $scope, tokenService, $location, $mdMedia, $sce, $filter, $state, $rootScope, $stateParams, creativityCategories, creativityActionsService) {
        $scope.updatesLoading = true;
        $rootScope.currentMenu = 'Home';
        $scope.onboard = $stateParams.onboard;
        if ($scope.onboard == 'login') {
            $rootScope.openLoginDialog();
        }

        if ($rootScope.authenticated) {
            $state.go("home.creativity");
        }

        $scope.limit = 3;
        console.log($scope.limit);
        if ($mdMedia('(min-width: 1610px)')) {
            $scope.limit = 4;
        } else if ($mdMedia('(min-width: 1200px)')) {
            $scope.limit = 3;
        } else {
            $scope.limit = 2;
        }
        console.log($scope.limit);

        $scope.creativityLoading = true;
        $scope.contentTopLoading = true;
        $scope.offset = 0;
        $scope.nonFinalContents = [];
        $rootScope.currentPageBackground = $rootScope.gray;
        $rootScope.title = "Dashboard";
        $scope.finalContents = [];
        $scope.categories = [{}, {}];
        $scope.types = creativityCategories.types;

        var cardObject = {};
        $scope.finalContents = [];
        $scope.mediaTypes = [4, 5, 6, 7, 12, 15, 16];

        const categoryTypes = [1, 2, 5, 4];
        var i = 0;
        var obj = { 'limit': $scope.limit, 'offset': 0, 'filters': [categoryTypes[i]] };
        tokenService.post("contentsList", obj)
            .then(function(response) {

                $scope.categories[i] = {};
                $scope.categories[i].title = creativityCategories.typesByID[categoryTypes[i] - 1];
                $scope.categories[i].finalContents = response;

                i = 1;
                obj = { 'limit': $scope.limit, 'offset': 0, 'filters': [categoryTypes[i]] };
                tokenService.post("contentsList", obj)
                    .then(function(response) {
                        $scope.categories[i] = {};
                        $scope.categories[i].title = creativityCategories.typesByID[categoryTypes[i] - 1];
                        $scope.categories[i].finalContents = response;

                        i = 2;
                        obj = { 'limit': $scope.limit, 'offset': 0, 'filters': [categoryTypes[i]] };
                        tokenService.post("contentsList", obj)
                            .then(function(response) {
                                $scope.categories[i] = {};
                                $scope.categories[i].title = creativityCategories.typesByID[categoryTypes[i] - 1];
                                $scope.categories[i].finalContents = response;

                                i = 3;
                                obj = { 'limit': $scope.limit, 'offset': 0, 'filters': [categoryTypes[i]] };
                                tokenService.post("contentsList", obj)
                                    .then(function(response) {
                                        $scope.categories[i] = {};
                                        $scope.categories[i].title = creativityCategories.typesByID[categoryTypes[i] - 1];
                                        $scope.categories[i].finalContents = response;
                                        $scope.creativityLoading = false;

                                    });
                            });
                    });
            });


        $scope.stop = function($event) {
            $event.stopPropagation();
        }

        $scope.myPagingFunction = function() {
            if ($scope.creativityLoading == false && $scope.offset < 5) {
                $scope.creativityLoading = true;
                tokenService.post("contentsList?limit=3&offset=", $scope.offset)
                    .then(function(tableData) {
                        $scope.creativityLoading = false;
                        if (tableData.data.length < 3) {
                            $scope.moreItems = false;
                        }

                        $scope.nonFinalContents = [];

                        $scope.contents = [];
                        $scope.contents = tableData.data;


                        $scope.creativityLoading = false;
                        $scope.finalContents = $scope.finalContents.concat($scope.contents);
                        $scope.offset += 3;
                        $scope.myPagingFunction();
                    });

            }
        };

        // $scope.myPagingFunction();


        $scope.heart = function(content, $index) {
            creativityActionsService.heart(content);
        }
        $scope.bookmark = function(content, index) {
            creativityActionsService.bookmark(content);
        }
        $scope.openProfile = function($event, username) {
            $event.stopPropagation();
            $state.go('home.profile', { username: username });
        };
    }


})();