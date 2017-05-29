(function() {

    angular
        .module('app')
        .controller('DashboardController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            'Upload',
            '$location',
            '$sce',
            '$filter',
            '$state',
            DashboardController
        ]);

    function DashboardController($mdDialog, $scope, tokenService, Upload, $location, $sce, $filter, $state) {
        $scope.events = {};
        $scope.updatesLoading = true;
        $scope.eventLoading = true;
        $scope.eventTopLoading = true;
        $scope.creativityLoading = false;
        $scope.contentTopLoading = true;
        $scope.offset = 0;
        $scope.nonFinalContents = [];
        $scope.finalContents = [];

        $scope.tags = ['AngularJs', 'Web Developement', 'Elon Musk', 'Poetry', 'Artificial Intelligence', 'Product Design', 'Feminism', 'Technology', 'Self Driving Cars'];
        var cardObject = {};
        $scope.finalContents = [];

        tokenService.get("/eventsDashboard")
            .then(function(events) {
                $scope.events = events.data;
                $scope.eventLoading = false;

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
                                    cardObject.description = $filter('limitTo')(item.description, 110, 0)
                                    cardObject.description = $sce.trustAsHtml(cardObject.description);
                                } else if ((item.type == 'cover' && !cardObject.type)) {
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
                            $scope.contentsTop.push(cardObject);
                            content = {};
                            $scope.loading = false;
                        });
                        console.log($scope.finalContents);
                    });
            });

        // tokenService.get("/college_updates")
        //     .then(function(updates) {
        //         $scope.updates = updates.data;
        //         $scope.updatesLoading = false;
        //     });
        $scope.myPagingFunction = function() {
            console.log('paging called');
            if ($scope.creativityLoading == false && $scope.offset < 5) {
                $scope.creativityLoading = true;
                tokenService.get("contents?limit=2&offset=" + $scope.offset)
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
                                if (item.type == 'text') {
                                    cardObject.description = $filter('limitTo')(item.description, 110, 0)
                                    cardObject.description = $sce.trustAsHtml(cardObject.description);
                                } else if ((item.type == 'cover' && !cardObject.type)) {
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
                        console.log($scope.creativityLoading);
                        $scope.finalContents = $scope.finalContents.concat($scope.nonFinalContents);
                        $scope.offset += 2;
                        console.log($scope.offset);
                    });
            }
        };




        $scope.heart = function(content, $index) {
            $scope.finalContents[$index].Actions.Appriciate.status = !$scope.finalContents[$index].Actions.Appriciate.status;
            if ($scope.finalContents[$index].Actions.Appriciate.status) {
                $scope.finalContents[$index].Actions.Appriciate.total += 1;
                tokenService.post('appreciateContent/' + content.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.finalContents[$index].Actions.Appriciate.total -= 1;

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
        $scope.bookmark = function(content, index) {
            $scope.finalContents[index].Actions.Bookmarked.status = !$scope.finalContents[index].Actions.Bookmarked.status;
            if ($scope.finalContents[index].Actions.Bookmarked.status) {
                $scope.finalContents[index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkContent/' + content.id).then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.finalContents[index].Actions.Bookmarked.total -= 1;
                tokenService.delete('bookmarkContent/' + content.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        $scope.openProfile = function($event, username) {
            $event.stopPropagation();
            console.log(username);
            $state.go('home.profile', {username: username});
        };
        $scope.heartEvent = function(event, $index, type) {
            $scope[type][$index].Actions.Bookmarked.status = !$scope[type][$index].Actions.Bookmarked.status;
            if ($scope[type][$index].Actions.Bookmarked.status) {
                $scope[type][$index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkEvent/' + event.id).then(function(result) {

                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope[type][$index].Actions.Bookmarked.total -= 1;

                tokenService.delete('bookmarkEvent/' + event.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        $scope.rsvpEvent = function(event, $index, type) {
            console.log(type);
            $scope[type][$index].Actions.Participants.status = !$scope[type][$index].Actions.Participants.status;
            if ($scope[type][$index].Actions.Participants.status) {
                $scope[type][$index].Actions.Participants.total += 1;
                tokenService.post('rsvpEvent/' + event.id).then(function(result) {

                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope[type][$index].Actions.Participants.total -= 1;

                tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }


    }


})();
