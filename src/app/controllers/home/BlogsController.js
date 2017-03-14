'use strict';

(function() {

    angular
        .module('app')
        .controller('BlogsController', [
            '$scope',
            'tokenService',
            '$mdDialog',
            BlogsController
        ]);

    function BlogsController($scope, tokenService, $mdDialog) {
        var vm = this;
        $scope.liked = false;
        $scope.loading = false;

        $scope.contents = [];

        $scope.myPagingFunction = function() {
            console.log("abc");
            if ($scope.loading == false) {
                $scope.loading = true;
                tokenService.get("contents")
                    .then(function(tableData) {
                        $scope.loading = false;
                        $scope.contents = $scope.contents.concat(tableData.data);
                    });
            }
        }

        $scope.toggleLike = function(contentId) {
            console.log(contentId);
            vm.liked = !vm.liked;
        }

        $scope.bookmark = function(content, $index) {
            $scope.contents[$index].Actions.Bookmarked.status = !$scope.contents[$index].Actions.Bookmarked.status;
            if ($scope.contents[$index].Actions.Bookmarked.status) {
                $scope.contents[$index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkedContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.contents[$index].Actions.Bookmarked.total -= 1;

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
            $scope.contents[$index].Actions.Appriciate.status = !$scope.contents[$index].Actions.Appriciate.status;
            if ($scope.contents[$index].Actions.Appriciate.status) {
                $scope.contents[$index].Actions.Appriciate.total += 1;
                tokenService.post('appriciateContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.contents[$index].Actions.Appriciate.total -= 1;

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