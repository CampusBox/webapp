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
            SearchCreativityController
        ]);

    function SearchCreativityController($scope, tokenService, $mdDialog, $sce, $state, $stateParams, $filter, $rootScope) {
        var vm = this;
        $scope.liked = false;
        $scope.loading = true;
        $scope.query = $stateParams.query;
        $scope.searchText = $stateParams.query;
        $scope.contents = [];
        $scope.nonFinalContents = [];
        $scope.finalContents = [];
        $scope.searchTypes = [];
        $scope.searchedFast = function(text) {
            $state.go('home.searchCreativity', { query: text });
        };
        $scope.types = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 },
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
            { 'title': 'Craft', 'id': 7 },
            { 'title': 'Dancing', 'id': 8 },
            { 'title': 'Singing', 'id': 9 },
            { 'title': 'Instrumental', 'id': 10 },
            { 'title': 'Digital Music', 'id': 11 },
            { 'title': 'Decor', 'id': 12 },
            { 'title': 'Film and Video', 'id': 13 },
            { 'title': 'Animation', 'id': 14 },
            { 'title': 'Graphics', 'id': 15 },
            { 'title': 'UI and UX', 'id': 16 },
            { 'title': 'Websites', 'id': 17 },
            { 'title': 'Programming', 'id': 18 },
            { 'title': 'Apps', 'id': 19 },
            { 'title': 'Electronics', 'id': 20 },
            { 'title': 'DIY', 'id': 21 }
        ];
        $scope.mediaTypes = [4, 5, 6, 7, 12, 15, 16];
        $scope.clicked = function(item) {
            console.log(item);
            $state.go('home.singleContent', { contentId: item });

        };
        var cardObject = {};
        tokenService.get("search/creativity/" + $scope.query)
            .then(function(tableData) {
                $scope.loading = false;
                $scope.nonFinalContents = [];
                $scope.contents = tableData.data;
                console.log($scope.contents);
                $scope.contents.forEach(function(content) {
                    cardObject = {};
                    cardObject.Actions = content.actions;
                    cardObject.Tags = content.Tags;
                    cardObject.created_at = content.created_at;
                    cardObject.created_at = Date.parse(cardObject.created_at.replace('-', '/', 'g')); //replace mysql date to js date format
                    cardObject.id = content.id;
                    cardObject.owner= content.owner;
                    cardObject.content_type= content.content_type;
                    $scope.types.some(function(obj) {
                        if (obj.id == cardObject.content_type) {
                            console.log(cardObject.category);
                            cardObject.category = obj.title;
                            cardObject.categoryId = obj.id;
                        } else {
                            return;
                        }
                    });
                    cardObject.title = $sce.trustAsHtml(content.title);
                    content.items.data.forEach(function(item) {
                        if (item.type == 'text') {
                            cardObject.description = item.description;
                            cardObject.description = $sce.trustAsHtml(cardObject.description);
                        } else if ((item.type == 'cover' && !cardObject.type)) {
                            cardObject.type = item.type;
                            cardObject.url = item.image;
                        } else if (item.type == 'soundcloud') {
                            cardObject.type = item.type;
                            item.embed.url = "//w.soundcloud.com/player/?url=" + item.embed.url;
                            cardObject.url = $sce.trustAsResourceUrl(item.embed.url);
                        } else if ((item.type == 'youtube' || item.type == 'vimeo') && !cardObject.type) {
                            cardObject.type = item.type;
                            cardObject.url = $sce.trustAsResourceUrl(item.embed.url);
                        } else if (((item.type == 'cover') || (item.type == 'image')) && !cardObject.type) {
                            cardObject.type = item.type;
                            cardObject.url = item.image;
                        }
                    });
                    if (cardObject.type != 'cover' || cardObject.type != 'soundcloud' || cardObject.type != 'youtube') {
                        cardObject.description = $filter('limitTo')(cardObject.description, 90, 0)
                    } else {
                        cardObject.description = $filter('limitTo')(cardObject.description, 110, 0)

                    }
                    content = {};
                    $scope.nonFinalContents.push(cardObject);
                    $scope.loading = false;

                });
                $scope.finalContents = $scope.finalContents.concat($scope.nonFinalContents);
                console.log($scope.finalContents);
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
        }
        $scope.openUrlAdd = function(ev) {
            $mdDialog.show({
                controller: 'AddUrlController',
                templateUrl: 'app/views/partials/addUrl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };


    }
}());
