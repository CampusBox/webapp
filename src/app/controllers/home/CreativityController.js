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
            CreativityController
        ]);

    function CreativityController($scope, tokenService, $mdDialog, $sce, $state) {
        var vm = this;
        $scope.liked = false;
        $scope.loading = false;
        $scope.finalContents = [];

        $scope.contents = [];
        $scope.clicked = function(item) {
            console.log(item);
            $state.go('home.singleContent', { contentId: item });

        };
                    var cardObject = {};
        tokenService.get("contents")
            .then(function(tableData) {
                $scope.loading = false;
                $scope.contents = $scope.contents.concat(tableData.data);
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
                        console.log(item);
                            // cardObject.description = item.description;
                            cardObject.description = $sce.trustAsHtml(item.description);
                        console.log(cardObject.description);
                        } else if ((item.type == 'youtube' || item.type == 'soundcloud' || item.type == 'vimeo') && !cardObject.type) {
                            cardObject.type = item.type;
                            cardObject.url = $sce.trustAsResourceUrl(item.embed.url);
                        } else if ((item.type == 'cover') && !cardObject.type) {
                            cardObject.type = item.type;
                            cardObject.url = item.image;
                        }
                    });
                    $scope.finalContents.push(cardObject);
                });
                console.log($scope.finalContents);
            });
        $scope.loading == false;
        $scope.myPagingFunction = function() {
            console.log("abc");
            if ($scope.loading == false) {
                $scope.loading = true;

            }
        }

        $scope.toggleLike = function(contentId) {
            console.log(contentId);
            vm.liked = !vm.liked;
        }

        $scope.bookmark = function(content, $index) {
            $scope.finalContents[$index].Actions.Bookmarked.status = !$scope.finalContents[$index].Actions.Bookmarked.status;
            if ($scope.finalContents[$index].Actions.Bookmarked.status) {
                $scope.finalContents[$index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkedContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.finalContents[$index].Actions.Bookmarked.total -= 1;

                tokenService.delete('bookmarkedContent/' + content.id, '').then(function(result) {
                    console.log('post request');
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
                tokenService.post('appriciateContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.finalContents[$index].Actions.Appriciate.total -= 1;

                tokenService.delete('appriciateContent/' + content.id, '').then(function(result) {
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
