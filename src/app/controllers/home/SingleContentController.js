(function() {

    angular
        .module('app')
        .controller('SingleContentController', [
            '$scope',
            'tokenService',
            '$mdDialog',
            '$stateParams',
            SingleContentController
        ]);

    function SingleContentController($scope, tokenService, $mdDialog, $stateParams) {
        var vm = this;
        $scope.contentId = $stateParams.contentId;
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
        $scope.follow = function() {
            $scope.demoFollow.status = !$scope.demoFollow.status;
            if ($scope.demoFollow.status) {
                // SEND FOLLOWER ID AND FOLLOWING ID IN POST
                tokenService.post('studentFollow/').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                // SEND FOLLOWER ID IN DELETE
                tokenService.delete('studentFollow/').then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        };
        tokenService.get("content/" + $scope.contentId)
            .then(function(tableData) {
                $scope.blogs = tableData.data;
                console.log($scope.blogs);
            });
    }

})();
