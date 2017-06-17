(function() {

    angular
        .module('app')
        .controller('ProfileController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$stateParams',
            '$state',
            '$location',
            '$sce',
            '$rootScope',
            ProfileController
        ]);

    function ProfileController($mdDialog, $scope, tokenService, $stateParams, $state, $location, $sce, $rootScope) {
        var cardObject = {};
        $scope.currentNavItem = 'overview';
        $scope.goto = function(page) {
            $scope.currentNavItem = page;
        };
        $rootScope.currentPageBackground = '#fff';

        $scope.followers = [];
        $scope.BookmarkedContents = [];
        $scope.CreativeContentsFinal = [];
        $scope.username = $stateParams.username;
        $scope.studentLoading = true;
        $scope.tab = 0;
        $rootScope.title = $stateParams.username;

        if ($rootScope.user != undefined) {
            if ($scope.username == $rootScope.user.username) {

                $state.go('home.myProfile');
            }
        }
        $scope.follow = function(type, index) {
            if ($rootScope.authenticated) {
                if (type) {
                    if ($scope.profile[type].data[index].following) {
                        tokenService.delete('studentFollow/' + $scope.profile[type].data[index].username).then(function(result) {
                            if (result.status != 'error') {
                                console.log(result.status);
                                $scope.profile[type].data[index].following = !$scope.profile[type].data[index].following;
                            } else {
                                console.log(result);
                            }
                        });
                    } else {

                        tokenService.post('studentFollow/' + $scope.profile[type].data[index].username).then(function(result) {
                            console.log('post request');
                            if (result.status != 'error') {
                                $scope.profile[type].data[index].following = !$scope.profile[type].data[index].following;
                                console.log(result.status);
                            } else {
                                console.log(result);
                            }
                        });
                    }

                } else {
                    if ($scope.profile.following) {
                        tokenService.delete('studentFollow/' + $scope.profile.username).then(function(result) {
                            if (result.status != 'error') {
                                console.log(result.status);
                                $scope.profile.following = !$scope.profile.following;
                            } else {
                                console.log(result);
                            }
                        });
                    } else {

                        tokenService.post('studentFollow/' + $scope.profile.username).then(function(result) {
                            console.log('post request');
                            if (result.status != 'error') {
                                $scope.profile.following = !$scope.profile.following;
                                console.log(result.status);
                            } else {
                                console.log(result);
                            }
                        });
                    }
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.follow(type, index);
                });
            }
        };

        $scope.openProfile = function(student) {
            $location.path('/profile' + student.username);
        };

        $scope.heart = function(event, $index, type) {
            if ($rootScope.authenticated) {
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
                        if (result.status == 'error') {
                            console.log(result);
                        } else {
                            console.log(result.status);
                        }
                    });
                }

            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.heart(event, $index, type);
                });
            }
        }
        $scope.rsvpEvent = function(event, $index, type) {
            if ($rootScope.authenticated) {

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
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.rsvpEvent(event, $index, type);
                });
            }
        }
        tokenService.get("student/" + $scope.username)
            .then(function(response) {
                $scope.profile = response.data;
                $scope.studentLoading = false;
                console.log($scope.profile);
                $scope.profile.BookmarkedContents.data.forEach(function(content) {
                    cardObject = {};
                    cardObject.Actions = content.Actions;
                    cardObject.Tags = content.Tags;
                    cardObject.created = content.created;
                    //replace mysql date to js date format
                    cardObject.created.at = Date.parse(cardObject.created.at.replace('-', '/', 'g'));
                    cardObject.id = content.id;
                    cardObject.title = $sce.trustAsHtml(content.title);
                    cardObject.links = content.links;
                    cardObject.total = content.links;

                    $scope.BookmarkedContents.push(cardObject);
                    content = {};
                    $scope.loading = false;
                });
                $scope.profile.CreativeContents.data.forEach(function(content) {
                    cardObject = {};
                    $scope.loading = false;
                    cardObject.Actions = content.Actions;
                    cardObject.Tags = content.Tags;
                    cardObject.created = content.created;
                    cardObject.created.at = Date.parse(cardObject.created.at.replace('-', '/', 'g')); //replace mysql date to js date format
                    cardObject.id = content.id;
                    cardObject.title = $sce.trustAsHtml(content.title);
                    cardObject.links = content.links;
                    cardObject.total = content.links;

                    $scope.CreativeContentsFinal.push(cardObject);
                    content = {};
                    $scope.loading = false;
                });
                console.log($scope.CreativeContentsFinal);
            });

    }

})();
