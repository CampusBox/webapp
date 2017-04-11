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
        var cardObject = {};

        $scope.followers = [];
        $scope.BookmarkedContents = [];
        $scope.CreativeContentsFinal = [];
        $scope.username = $stateParams.username;
        $scope.listLoading = true;


        $scope.follow = function(type, index) {
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
        };

        $scope.openProfile = function(student) {
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
                    if (result.status == 'error') {
                        console.log(result);
                    } else {
                        console.log(result.status);
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
                    cardObject = {};
                    $scope.listLoading = false;
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
