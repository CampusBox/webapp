(function() {

    angular
        .module('app')
        .controller('DashboardController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$location',
            '$sce',
            '$filter',
            '$state',
            '$rootScope',
            '$stateParams',
            'creativityCategories',
            DashboardController
        ]);

    function DashboardController($mdDialog, $scope, tokenService, $location, $sce, $filter, $state, $rootScope, $stateParams, creativityCategories) {
        $scope.events = {};
        $scope.updatesLoading = true;
        $scope.eventLoading = true;
        $scope.eventTopLoading = true;
        $scope.onboard = $stateParams.onboard;
        if ($scope.onboard == 'login') {
            $rootScope.openLoginDialog();
        }
        $scope.creativityLoading = false;
        $scope.contentTopLoading = true;
        $scope.offset = 0;
        $scope.nonFinalContents = [];
        $rootScope.currentPageBackground = $rootScope.gray;
        $rootScope.title = "Dashboard";
        $scope.finalContents = [];
        $scope.types = creativityCategories.types;

        var cardObject = {};
        $scope.finalContents = [];
        $scope.mediaTypes = [4, 5, 6, 7, 12, 15, 16];


            // tokenService.get("eventsDashboard")
            // changing temporarily till api is fixed
        tokenService.get("minievents?limit=3")
            .then(function(events) {
                $scope.events = events.data;
                console.log($scope.events);
                $scope.eventLoading = false;
                // $scope.myPagingFunction();
                // tokenService.get("contentsRandom")
                tokenService.get("contentsRandom")
                    .then(function(contentsDashboard) {
                        $scope.contents = contentsDashboard.data;
                        $scope.contentsTop = contentsDashboard.data;
                        $scope.contentLoading = false;
                        $scope.contentTopLoading = false;
                        $scope.contents.forEach(function(content) {
                            cardObject = {}
                            $scope.loading == false;
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
                                    cardObject.description = item.description;
                                    // cardObject.description = $filter('limitTo')(item.description, 110, 0);
                                    cardObject.description = $sce.trustAsHtml(cardObject.description);
                                } else if (item.type == 'cover' && !cardObject.type) {
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
                            if (cardObject.type != 'cover' || cardObject.type != 'soundcloud' || cardObject.type != 'youtube') {
                                cardObject.description = $filter('limitTo')(cardObject.description, 90, 0)
                            } else {
                                cardObject.description = $filter('limitTo')(cardObject.description, 150, 0)

                            }
                            $scope.contentsTop.push(cardObject);
                            content = {};
                            $scope.loading = false;
                        });
                    });
                $scope.myPagingFunction();
            });
        $scope.showLikes = function(id, title) {
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
        $scope.stop = function($event) {
            $event.stopPropagation();
        }
        $scope.myPagingFunction = function() {
            if ($scope.creativityLoading == false && $scope.offset < 5) {
                $scope.creativityLoading = true;
                $scope.meraTitle = "abcd";
                tokenService.get("contents?limit=3&offset=" + $scope.offset)
                    .then(function(tableData) {
                        $scope.creativityLoading = false;
                        if (tableData.data.length < 3) {
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
                            cardObject.content = content.content;
                            $scope.types.some(function(obj) {
                                if (obj.id == cardObject.content.type) {
                                    cardObject.content.category = obj.title;
                                } else {
                                    return;
                                }
                            });
                            cardObject.links = content.links;
                            cardObject.total = content.links;
                            content.Items.data.forEach(function(item) {
                                if (item.type == 'text') {
                                    cardObject.description = item.description;
                                    cardObject.description = $sce.trustAsHtml(cardObject.description);
                                } else if ((item.type == 'cover' && !cardObject.type)) {
                                    cardObject.type = item.type;
                                    cardObject.url = item.image;
                                } else if (item.type == 'soundcloud') {
                                    cardObject.type = item.type;
                                    item.embed.url = "//w.soundcloud.com/player/?url=" + item.embed.url;
                                    cardObject.url = $sce.trustAsResourceUrl(item.embed.url);
                                } else if ((item.type == 'youtube' || item.type == 'vimeo') && !cardObject.type) {
                                    cardObject.type = item.type;
                                    cardObject.url = $sce.trustAsResourceUrl(item.embed.url);
                                } else if (((item.type == 'cover') || (item.type == 'image')) && !cardObject.type) {
                                    cardObject.type = item.type;
                                    cardObject.url = item.image;
                                }
                            });
                            if (cardObject.type != 'cover' || cardObject.type != 'soundcloud' || cardObject.type != 'youtube') {
                                cardObject.description = $filter('limitTo')(cardObject.description, 90, 0)
                            } else {
                                cardObject.description = $filter('limitTo')(cardObject.description, 150, 0)

                            }
                            $scope.nonFinalContents.push(cardObject);
                            content = {};
                            $scope.creativityLoading = false;

                        });
                        $scope.creativityLoading = false;
                        $scope.finalContents = $scope.finalContents.concat($scope.nonFinalContents);
                        $scope.offset += 3;
                        $scope.myPagingFunction();
                    });
            }
        };

        // $scope.myPagingFunction();


        $scope.heart = function(content, $index) {
            if ($rootScope.authenticated) {
                $scope.finalContents[$index].Actions.Appreciate.status = !$scope.finalContents[$index].Actions.Appreciate.status;
                if ($scope.finalContents[$index].Actions.Appreciate.status) {
                    $scope.finalContents[$index].Actions.Appreciate.total += 1;
                    tokenService.post('appreciateContent/' + content.id).then(function(result) {


                    });
                } else {
                    $scope.finalContents[$index].Actions.Appreciate.total -= 1;

                    tokenService.delete('appreciateContent/' + content.id, '').then(function(result) {

                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.heart(content, $index);
                });
            }
        }
        $scope.bookmark = function(content, index) {
            if ($rootScope.authenticated) {

                $scope.finalContents[index].Actions.Bookmarked.status = !$scope.finalContents[index].Actions.Bookmarked.status;
                if ($scope.finalContents[index].Actions.Bookmarked.status) {
                    $scope.finalContents[index].Actions.Bookmarked.total += 1;
                    tokenService.post('bookmarkContent/' + content.id).then(function(result) {

                    });
                } else {
                    $scope.finalContents[index].Actions.Bookmarked.total -= 1;
                    tokenService.delete('bookmarkContent/' + content.id, '').then(function(result) {

                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.bookmark(content, index);
                });
            }
        }
        $scope.openProfile = function($event, username) {
            $event.stopPropagation();
            $state.go('home.profile', { username: username });
        };
    }


})();
