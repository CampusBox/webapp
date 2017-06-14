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

            PopUpCreativityController
        ]);

    function PopUpCreativityController($scope, tokenService, $mdDialog, $stateParams, $sce, $rootScope, $location, Socialshare, creativity) {
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



        $scope.types = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 },
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
            { 'title': 'Craft', 'id': 7 },
            // { 'title': 'Dancing', 'id': 8 },
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
        $scope.toggleLike = function(blogId) {
            console.log(blogId);
            vm.liked = !vm.liked;
        };
        // Socialshare.share({
        //   'provider': 'facebook',
        //   'attrs': {
        //     'socialshareUrl': 'http://720kb.net'
        //   }
        // });

        $scope.showLikes = function($event, id, title) {
            $event.stopPropagation();
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