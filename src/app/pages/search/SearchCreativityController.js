'use strict';

(function() {

    angular
        .module('app')
        .controller('SearchCreativityController', [
            '$scope',
            'tokenService',
            '$mdDialog',
            '$sce',
            '$state',
            '$stateParams',
            '$filter',
            '$rootScope',
            'creativityCategories',
            SearchCreativityController
        ]);

    function SearchCreativityController($scope, tokenService, $mdDialog, $sce, $state, $stateParams, $filter, $rootScope, creativityCategories) {
        var vm = this;
        $scope.liked = false;
        $scope.loading = true;
        $scope.query = $stateParams.query;
        $scope.searchText = $stateParams.query;
        $scope.contents = [];
        $scope.nonFinalContents = [];
                $rootScope.currentPageBackground = $rootScope.gray;
        $rootScope.title = $stateParams.query+" in creativity.";

        $scope.finalContents = [];
        $scope.searchTypes = [];
        $scope.searchedFast = function(text) {
            $state.go('home.searchCreativity', { query: text });
        };
        $scope.types = creativityCategories.types;
        $scope.mediaTypes = [4, 5, 6, 7, 12, 15, 16];
        $scope.clicked = function(item) {
            console.log(item);
            $state.go('home.singleContent', { contentId: item });

        };
        var cardObject = {};
        tokenService.get("search/creativity/" + $scope.query)
            .then(function(tableData) {
                $scope.loading = false;
                $scope.contents = tableData.data;
                $scope.finalContents = $scope.finalContents.concat($scope.contents);
            });
        $scope.openProfile = function($event, username) {
            $event.stopPropagation();
            console.log(username);
            $state.go('home.profile', { username: username });
        };
        $scope.toggleLike = function(contentId) {
            console.log(contentId);
            vm.liked = !vm.liked;
        }

        $scope.bookmark = function(content, index) {
            if ($rootScope.authenticated) {
                $scope.finalContents[index].Actions.Bookmarked.status = !$scope.finalContents[index].Actions.Bookmarked.status;
                if ($scope.finalContents[index].Actions.Bookmarked.status) {
                    $scope.finalContents[index].Actions.Bookmarked.total += 1;
                    tokenService.post('bookmarkContent/' + content.id).then(function(result) {
                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                } else {
                    $scope.finalContents[index].Actions.Bookmarked.total -= 1;
                    tokenService.delete('bookmarkContent/' + content.id, '').then(function(result) {
                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.bookmark(content, index);
                });
            }
        }
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
        $scope.heart = function(content, $index) {
            if ($rootScope.authenticated) {

                $scope.finalContents[$index].Actions.Appreciate.status = !$scope.finalContents[$index].Actions.Appreciate.status;
                if ($scope.finalContents[$index].Actions.Appreciate.status) {
                    $scope.finalContents[$index].Actions.Appreciate.total += 1;
                    tokenService.post('appreciateContent/' + content.id).then(function(result) {

                        console.log('post request');
                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                } else {
                    $scope.finalContents[$index].Actions.Appreciate.total -= 1;

                    tokenService.delete('appreciateContent/' + content.id, '').then(function(result) {
                        console.log('post request');
                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.heart(content, $index);
                });
            }
        };
        

    }
}());
