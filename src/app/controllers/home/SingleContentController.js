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
            '$location',
            'Socialshare',
            SingleContentController
        ]);

    function SingleContentController($scope, tokenService, $mdDialog, $stateParams, $sce, $rootScope, $location, Socialshare) {
        var vm = this;
        $scope.contentId = $stateParams.contentId;
        $scope.liked = false;
        $scope.loading = true;
        $scope.content = {};
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
        tokenService.get("content/" + $scope.contentId)
            .then(function(tableData) {
                $scope.loading = false;
                $scope.content = tableData.data;
                console.log(JSON.parse(angular.toJson($scope.content)));
                console.log($scope.content.Items.data[1].image);
                console.log($location.absUrl());

                
                
                $scope.types.some(function(obj) {
                    if (obj.id == $scope.content.content.type) {
                        $scope.content.content.category = obj.title;
                    } else {
                        return;
                    }
                });
                $scope.content.created.at = new Date(Date.parse($scope.content.created.at.replace('-', '/', 'g'))); //replace mysql date to js date format
                $scope.content.title = $sce.trustAsHtml($scope.content.title);
                for (item in $scope.content.Items.data) {
                    if ($scope.content.Items.data[item].type == 'youtube') {
                        $scope.content.Items.data[item].embed.url = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + $scope.content.Items.data[item].embed.url);
                    } else if ($scope.content.Items.data[item].type == 'soundcloud') {
                        $scope.content.Items.data[item].embed.url = "//w.soundcloud.com/player/?url=" + $scope.content.Items.data[item].embed.url;
                        console.log($scope.content.Items.data[item].embed.url);
                        $scope.content.Items.data[item].embed.url = $sce.trustAsResourceUrl($scope.content.Items.data[item].embed.url);
                        var widgetIframe = document.getElementById('sc-widget'),
                            widget = SC.Widget(widgetIframe),
                            newSoundUrl = $scope.content.Items.data[item].embed.url;
                        widget.bind(SC.Widget.Events.READY, function() {
                            // load new widget
                            widget.bind(SC.Widget.Events.FINISH, function() {
                                widget.load(newSoundUrl, {
                                    show_artwork: false
                                });
                            });
                        });
                    } else if ($scope.content.Items.data[item].type == 'vimeo') {
                        $scope.content.Items.data[item].embed.url = $sce.trustAsResourceUrl($scope.content.Items.data[item].embed.url);
                    } else if ($scope.content.Items.data[item].type == 'text') {
                        $scope.content.Items.data[item].description = $sce.trustAsHtml($scope.content.Items.data[item].description);
                    }
                }

                tokenService.get("contentsRandom")
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
                    });
            });
    }

})();
