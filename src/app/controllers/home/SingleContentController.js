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
        $scope.content = {};
        $scope.toggleLike = function(blogId) {
            console.log(blogId);
            vm.liked = !vm.liked;
        }

        $scope.bookmark = function(content) {
            $scope.content.Actions.Bookmarked.status = !$scope.content.Actions.Bookmarked.status;
            if ($scope.content.Actions.Bookmarked.status) {
                $scope.content.Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.content.Actions.Bookmarked.total -= 1;

                tokenService.delete('bookmarkContent/' + content.id, '').then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        $scope.heart = function(content) {
            $scope.content.Actions.Appriciate.status = !$scope.content.Actions.Appriciate.status;
            if ($scope.content.Actions.Appriciate.status) {
                $scope.content.Actions.Appriciate.total += 1;
                tokenService.post('appreciateContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.content.Actions.Appriciate.total -= 1;

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
                $scope.content = tableData.data;
                console.log($scope.content);
            });
    }

})();
