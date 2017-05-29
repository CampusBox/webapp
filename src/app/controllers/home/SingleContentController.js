(function() {

    angular
        .module('app')
        .controller('SingleContentController', [
            '$scope',
            'tokenService',
            '$mdDialog',
            '$stateParams',
            '$sce',
            '$rootScope',
            SingleContentController
        ]);

    function SingleContentController($scope, tokenService, $mdDialog, $stateParams, $sce, $rootScope) {
        var vm = this;
        $scope.contentId = $stateParams.contentId;
        $scope.liked = false;
        $scope.loading = true;
        $scope.content = {};
        $scope.toggleLike = function(blogId) {
            console.log(blogId);
            vm.liked = !vm.liked;
        };

        $scope.bookmark = function(content) {
            if ($rootScope.authenticated) {
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
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.bookmark(content);
                });
            }
        }
        $scope.heart = function(content) {
            if ($rootScope.authenticated) {
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
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.heart(content);
                });
            }
        }
        $scope.follow = function($event) {
            if ($rootScope.authenticated) {
                $event.stopPropagation();
                if ($scope.content.created.by.following) {
                    tokenService.delete('studentFollow/' + $scope.content.created.by.username).then(function(result) {
                        if (result.status != 'error') {
                            console.log(result.status);
                            $scope.content.created.by.following = !$scope.content.created.by.following;
                        } else {
                            console.log(result);
                        }
                    });
                } else {

                    tokenService.post('studentFollow/' + $scope.content.created.by.username).then(function(result) {
                        console.log('post request');
                        if (result.status != 'error') {
                            $scope.content.created.by.following = !$scope.students[index].following;
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.follow($event);
                });
            }
        };
        tokenService.get("content/" + $scope.contentId)
            .then(function(tableData) {
                $scope.loading = false;
                $scope.content = tableData.data;
                $scope.content.created.at = new Date(Date.parse($scope.content.created.at.replace('-', '/', 'g'))); //replace mysql date to js date format
                $scope.content.title = $sce.trustAsHtml($scope.content.title);
                for (item in $scope.content.Items.data) {
                    if ($scope.content.Items.data[item].type == 'youtube') {
                        $scope.content.Items.data[item].embed.url = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + $scope.content.Items.data[item].embed.url);
                    } else if ($scope.content.Items.data[item].type == 'soundcloud' || $scope.content.Items.data[item].type == 'vimeo') {
                        $scope.content.Items.data[item].embed.url = $sce.trustAsResourceUrl($scope.content.Items.data[item].embed.url);
                    } else if ($scope.content.Items.data[item].type == 'text') {
                        $scope.content.Items.data[item].description = $sce.trustAsHtml($scope.content.Items.data[item].description);
                    }
                }
                console.log($scope.content);
                tokenService.get("contentsRandom")
                    .then(function(tableData) {
                        console.log(tableData);
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
                                if ((item.type == 'cover' && !cardObject.type)) {
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
                        $scope.finalContents = $scope.nonFinalContents;
                        $scope.offset += 2;
                        console.log($scope.offset);
                    });
            });
    }

})();
