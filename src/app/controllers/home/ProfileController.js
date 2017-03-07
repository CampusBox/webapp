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
            ProfileController
        ]);

    function ProfileController($mdDialog, $scope, tokenService, $stateParams, $state, allDataService) {
        var vm = this;

        $scope.followers = [];
        $scope.demoFollow = [{ 'status:': true }];
        $scope.studentId = $stateParams.studentId;
        console.log($scope.studentId);
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
        }
        $scope.heart = function(event, $index) {
            $scope.profile.Events.data[$index].Actions.Bookmarked.status = !$scope.profile.Events.data[$index].Actions.Bookmarked.status;
            if ($scope.profile.Events.data[$index].Actions.Bookmarked.status) {
                $scope.profile.Events.data[$index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkEvent/' + event.id).then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.profile.Events.data[$index].Actions.Bookmarked.total -= 1;

                tokenService.delete('bookmarkEvent/' + event.id, '').then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        $scope.update = function(event, $index) {
            $scope.profile.Events.data[$index].Actions.Participants.status = !$scope.profile.Events.data[$index].Actions.Participants.status;
            if ($scope.profile.Events.data[$index].Actions.Participants.status) {
                $scope.profile.Events.data[$index].Actions.Participants.total += 1;
                tokenService.post('ParticipantsEvent/' + event.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.profile.Events.data[$index].Actions.Participants.total -= 1;

                tokenService.delete('ParticipantsEvent/' + event.id, '').then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        tokenService.get("student/" + $scope.studentId)
            .then(function(response) {
                console.log(response);
                $scope.profile = response.data;
                console.log($scope.profile);
            });



    }

})();
