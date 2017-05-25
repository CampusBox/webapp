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
            CreativityController
        ]);

    function CreativityController($scope, tokenService, $mdDialog, $sce, $state, $filter) {
        $scope.liked = false;
        $scope.creativityLoading = false;
        $scope.offset = 0;
        $scope.moreItems = true;
        $scope.nonFinalContents = [];
        $scope.finalContents = [];
        $scope.types = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 },
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
            { 'title': 'Craft', 'id': 7 },
            { 'title': 'Clay', 'id': 8 },
            { 'title': 'Dancing', 'id': 22 },
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

        $scope.contents = [];
        $scope.clicked = function(item) {
            console.log(item);
            $state.go('home.singleContent', { contentId: item });

        };
        $scope.openProfile = function($event, username) {
            $event.stopPropagation();
            $state.go('home.profile', { username: username });
        };

        var cardObject = {};
        $scope.myPagingFunction = function() {
            console.log('paging called');
            if ($scope.creativityLoading == false && $scope.moreItems == true) {
                $scope.creativityLoading = true;
                tokenService.get("contents?limit=2&offset=" + $scope.offset)
                    .then(function(tableData) {
                        $scope.creativityLoading = false;
                        if (tableData.data.length < 2) {
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
                            cardObject.links = content.links;
                            cardObject.total = content.links;
                            content.Items.data.forEach(function(item) {
                                if (item.type == 'text') {
                                    cardObject.description = $filter('limitTo')(item.description, 110, 0)
                                    cardObject.description = $sce.trustAsHtml(cardObject.description);
                                } else if ((item.type == 'cover' && !cardObject.type)) {
                                    cardObject.type = item.type;
                                    cardObject.url = item.image;
                                } else if ((item.type == 'youtube' || item.type == 'soundcloud' || item.type == 'vimeo') && !cardObject.type) {
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
                        console.log($scope.creativityLoading);
                        $scope.finalContents = $scope.finalContents.concat($scope.nonFinalContents);
                        $scope.offset += 2;
                        console.log($scope.offset);
                    });
            }
        };




        $scope.toggleLike = function(contentId) {
            console.log(contentId);
            vm.liked = !vm.liked;
        }

        $scope.bookmark = function(content, index) {
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
        }
        $scope.heart = function(content, $index) {
            $scope.finalContents[$index].Actions.Appriciate.status = !$scope.finalContents[$index].Actions.Appriciate.status;
            if ($scope.finalContents[$index].Actions.Appriciate.status) {
                $scope.finalContents[$index].Actions.Appriciate.total += 1;
                tokenService.post('appreciateContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.finalContents[$index].Actions.Appriciate.total -= 1;

                tokenService.delete('appreciateContent/' + content.id, '').then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
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
