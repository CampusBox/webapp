'use strict';
(function() {
    angular
        .module('app')
        .controller('PopUpCreativityController', [
            '$scope',
            'tokenService',
            '$mdDialog',
            '$stateParams',
            '$sce',
            '$rootScope',
            '$location',
            'Socialshare',
            'creativity',
            'creativityCategories',
            PopUpCreativityController
        ]);

    function PopUpCreativityController($scope, tokenService, $mdDialog, $stateParams, $sce, $rootScope, $location, Socialshare, creativity, creativityCategories) {
        var vm = this;


        creativity.Items.data.forEach(function(item) {
            if (item.type == 'youtube') {
                item.embed.url = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + item.embed.url);
            } else if (item.type == 'vimeo') {
                item.embed.url = $sce.trustAsResourceUrl(item.embed.url);
            } else if (item.type == 'cover' || item.type == 'image') {
                item.image = item.image;
            }
        });
        console.log(creativity.Items.data);
        $scope.content = creativity;
        $scope.contentId = $stateParams.contentId;
        $scope.liked = false;
        $rootScope.currentPageBackground = '#fff';
        $scope.loading = true;
        // console.log(content);
        // tokenService.get("participants/" + content)
        //     .then(function(participants) {
        //         console.log(participants)
        //         $scope.participants = participants;
        //     });

        $scope.save = function() {
            $scope.title = $scope.editableTitle;
            $scope.disableEditor();
        };
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };



        $scope.types = creativityCategories.types;
        $scope.toggleLike = function(blogId) {
            console.log(blogId);
            vm.liked = !vm.liked;
        };

        $scope.showLikes = function($event, id, title) {
            $event.stopPropagation();
            $mdDialog.show({
                controller: 'ShowLikesController',
                templateUrl: 'app/dialogs/showLikes.html',
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
        $scope.heart = function($event, content, index) {
            $event.stopPropagation();
            if ($rootScope.authenticated) {
                if (index) {
                    $event.stopPropagation();
                    $scope.finalContents[index].Actions.Appreciate.status = !$scope.finalContents[index].Actions.Appreciate.status;
                    if ($scope.finalContents[index].Actions.Appreciate.status) {
                        $scope.finalContents[index].Actions.Appreciate.total += 1;
                        tokenService.post('appreciateContent/' + $scope.finalContents[index].id).then(function(result) {

                            console.log('post request');
                            if (result.status != 'error') {
                                console.log(result.status);
                            } else {
                                console.log(result);
                            }
                        });
                    } else {
                        $scope.finalContents[index].Actions.Appreciate.total -= 1;

                        tokenService.delete('appreciateContent/' + $scope.finalContents[index].id, '').then(function(result) {
                            console.log('post request');
                            if (result.status != 'error') {
                                console.log(result.status);
                            } else {
                                console.log(result);
                            }
                        });
                    }
                } else {
                    $scope.content.Actions.Appreciate.status = !$scope.content.Actions.Appreciate.status;
                    if ($scope.content.Actions.Appreciate.status) {
                        $scope.content.Actions.Appreciate.total += 1;
                        tokenService.post('appreciateContent/' + content.id).then(function(result) {

                            console.log('post request');
                            if (result.status != 'error') {
                                console.log(result.status);
                            } else {
                                console.log(result);
                            }
                        });
                    } else {
                        $scope.content.Actions.Appreciate.total -= 1;

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
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.heart(content);
                });
            }
        }
        $scope.follow = function($event) {
            $event.stopPropagation();
            if ($rootScope.authenticated) {
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


    }

})();