(function() {

    angular
        .module('app')
        .controller('ProfileController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$stateParams',
            '$state',
            'allDataService',
            '$location',
            '$sce',
            ProfileController
        ]);

    function ProfileController($mdDialog, $scope, tokenService, $stateParams, $state, allDataService, $location, $sce) {
        var vm = this;

        $scope.followers = [];
        $scope.BookmarkedContents = [];
        $scope.CreativeContents = [];
        $scope.demoFollow = [{ 'status:': true }];
        $scope.username = $stateParams.username;
        $scope.loading == true;
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/partials/addEvent.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        $scope.showEvent = function(ev, index) {
            $mdDialog.show({
                    controller: 'SingleEventController',
                    templateUrl: 'app/views/partials/singleEvent.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    locals: {
                        events: $scope.profile.Events.data,
                        index: index
                    },
                    closeTo: '#left',
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
        $scope.follow = function() {
            $scope.demoFollow.status = !$scope.demoFollow.status;
            if ($scope.demoFollow.status) {
                tokenService.post('studentFollow/' + $scope.profile.username).then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                // SEND FOLLOWER ID IN DELETE
                tokenService.delete('studentFollow/').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        };
        $scope.openProfile = function(stuent) {
            $location.path('/profile' + student.username);
        };

        $scope.heart = function(event, $index, type) {
            $scope.profile[type].data[$index].Actions.Bookmarked.status = !$scope.profile[type].data[$index].Actions.Bookmarked.status;
            if ($scope.profile[type].data[$index].Actions.Bookmarked.status) {
                $scope.profile[type].data[$index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkEvent/' + event.id).then(function(result) {

                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.profile[type].data[$index].Actions.Bookmarked.total -= 1;

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
            $scope.profile[type].data[$index].Actions.Participants.status = !$scope.profile[type].data[$index].Actions.Participants.status;
            if ($scope.profile[type].data[$index].Actions.Participants.status) {
                $scope.profile[type].data[$index].Actions.Participants.total += 1;
                tokenService.post('rsvpEvent/' + event.id).then(function(result) {

                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.profile[type].data[$index].Actions.Participants.total -= 1;

                tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        tokenService.get("student/" + $scope.username)
            .then(function(response) {
                $scope.profile = response.data;
                console.log($scope.profile);
                $scope.profile.BookmarkedContents.data.forEach(function(content) {
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
                    $scope.BookmarkedContents.push(cardObject);
                    content = {};
                    $scope.loading = false;
                });
        $scope.profile.CreativeContents.data.forEach(function(content) {
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
            $scope.CreativeContents.push(cardObject);
            content = {};
            $scope.loading = false;
        });
            });

    }

})();
