'use strict';

(function() {

    angular
        .module('app')
        .controller('CreativityController', [
            '$scope',
            'tokenService',
            '$mdDialog',
            '$sce',
            '$state',
            '$filter',
            '$rootScope',
            CreativityController
        ]);

    function CreativityController($scope, tokenService, $mdDialog, $sce, $state, $filter, $rootScope) {
        $scope.liked = false;
        $scope.creativityLoading = false;
        $scope.offset = 0;
        $scope.moreItems = true;
        $scope.nonFinalContents = [];
        $scope.finalContents = [];
        $scope.finalContentsCopy = [];
        $scope.selected = [];
        $scope.filterInBetween = 0;
        $scope.selectedCategories = [];
        $scope.types = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 },
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
            { 'title': 'Craft', 'id': 7 },
            // { 'title': 'Clay', 'id': 8 },
            { 'title': 'Dancing', 'id': 8 },
            { 'title': 'Singing', 'id': 9 },
            { 'title': 'Instrumental', 'id': 10 },
            { 'title': 'Digital Music', 'id': 11 },
            { 'title': 'Photography', 'id': 12 },
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
        $scope.contents = [];
        $scope.openProfile = function($event, username) {
            $event.stopPropagation();
            $state.go('home.profile', { username: username });
        };
        var cardObject = {};
        $scope.contentDetails = {
            "limit": 3,
            "offset": 0,
            "filters": []
        };
        $scope.myPagingFunction = function() {
            if ($scope.creativityLoading == false && $scope.moreItems == true) {
                console.log('hellosssss');
                $scope.creativityLoading = true;
                if ($scope.contentDetails.filters.length) {
                    $scope.filterInBetween = 1;
                    console.log('filter called from between');
                }
                tokenService.post("contents", $scope.contentDetails)
                    .then(function(tableData) {
                        $scope.creativityLoading = false;
                        if (tableData.data.length < 3) {
                            $scope.moreItems = false;
                        }

                        $scope.nonFinalContents = [];
                        $scope.contents = tableData.data;

                        $scope.contents.forEach(function(content) {
                            cardObject = {};
                            cardObject.Actions = content.Actions;
                            cardObject.Tags = content.Tags;
                            cardObject.created = content.created;
                            cardObject.created.at = Date.parse(cardObject.created.at.replace('-', '/', 'g')); //replace mysql date to js date format
                            cardObject.id = content.id;
                            cardObject.title = $sce.trustAsHtml(content.title);
                            cardObject.content = content.content;
                            $scope.types.some(function(obj) {
                                if (obj.id == cardObject.content.type) {
                                    cardObject.category = obj.title;
                                    cardObject.categoryId = obj.id;
                                } else {
                                    return;
                                }
                            });
                            cardObject.links = content.links;
                            cardObject.total = content.links;
                            content.Items.data.forEach(function(item) {
                                if (item.type == 'text') {
                                    cardObject.description = $filter('limitTo')(item.description, 90, 0)
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
                            $scope.nonFinalContents.push(cardObject);
                            content = {};
                            $scope.creativityLoading = false;

                        });
                        $scope.creativityLoading = false;
                        $scope.finalContents = $scope.finalContents.concat($scope.nonFinalContents);
                        $scope.finalContentsCopy = $scope.finalContentsCopy.concat($scope.nonFinalContents);
                        $scope.contentDetails.offset += 3;
                        $scope.myPagingFunction();
                    });

            }
        };
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };
        var deleteList = [];
        $scope.toggle = function(item, list) {
            console.log('$scope.filterInBetween' + $scope.filterInBetween);
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
                deleteList.splice(idx, 1);
                $scope.contentDetails.filters = deleteList;
                if ($scope.filterInBetween) {
                    $scope.creativityLoading = false;
                    $scope.moreItems = true;
                    $scope.contentDetails.offset = 0;
                    $scope.filterInBetween = 0;
                    $scope.finalContentsCopy = [];
                    $scope.finalContents = [];
                    $scope.myPagingFunction();
                    console.log('if condition i.e paging');
                } else {
                    console.log('Normal static filter');
                    $scope.finalContents = $scope.finalContentsCopy.filter(function(obj) {
                        return deleteList.indexOf(obj.categoryId) != -1;
                    });
                }
            } else {
                list.push(item);
                deleteList.push(item.id);
                $scope.contentDetails.filters = deleteList;
                if ($scope.filterInBetween) {
                    $scope.creativityLoading = false;
                    $scope.moreItems = true;
                    $scope.contentDetails.offset = 0;
                    $scope.filterInBetween = 0;
                    $scope.finalContentsCopy = [];
                    $scope.finalContents = [];
                    $scope.myPagingFunction();
                    console.log('if condition i.e paging');
                } else {
                    console.log('Noramal static filter');

                    $scope.finalContents = $scope.finalContentsCopy.filter(function(obj) {
                        return deleteList.indexOf(obj.categoryId) != -1;
                    });
                }

                $scope.buttonClass = 'md-primary md-raised';
            }
            item.intrested = !item.intrested;
            $scope.selectedCategories = list;
        };
        $scope.showLikes = function(id, title) {
            $mdDialog.show({
                controller: 'ShowLikesController',
                templateUrl: 'app/views/partials/showLikes.html',
                parent: angular.element(document.body),
                scope: $scope,
                locals: {
                    title: title,
                    id: id
                },
                preserveScope: true,
                escapeToClose: true,
                fullscreen: true,
                clickOutsideToClose: true,
                controllerAs: 'dc'
            })
        }

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
