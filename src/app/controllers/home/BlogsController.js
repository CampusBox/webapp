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
        $scope.blogs = {};

        $scope.toggleLike = function(blogId) {
            console.log(blogId);
            vm.liked = !vm.liked;
        }

        $scope.bookmark = function(content, $index) {
            $scope.blogs[$index].Actions.Bookmarked.status = !$scope.blogs[$index].Actions.Bookmarked.status;
            if ($scope.blogs[$index].Actions.Bookmarked.status) {
                $scope.blogs[$index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkedContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.blogs[$index].Actions.Bookmarked.total -= 1;

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
            $scope.blogs[$index].Actions.Appriciate.status = !$scope.blogs[$index].Actions.Appriciate.status;
            if ($scope.blogs[$index].Actions.Appriciate.status) {
                $scope.blogs[$index].Actions.Appriciate.total += 1;
                tokenService.post('appriciateContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.blogs[$index].Actions.Appriciate.total -= 1;

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
        tokenService.get("contents")
            .then(function(tableData) {
                $scope.blogs = tableData.data;
                console.log($scope.blogs);
            });
    }

})();
