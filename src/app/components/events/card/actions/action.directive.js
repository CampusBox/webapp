(function() {
    'use strict';

    angular.module('app').
    directive('action', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/events/card/actions/action.html',

            controller: function($mdDialog, $scope, $element, tokenService,  $timeout, $location, $state, $rootScope) {
                $scope.heartEvent = function(event, $index) {
                    if ($rootScope.authenticated) {
                        $scope.events[$index].Actions.Bookmarked.status = !$scope.events[$index].Actions.Bookmarked.status;
                        if ($scope.events[$index].Actions.Bookmarked.status) {
                            $scope.events[$index].Actions.Bookmarked.total += 1;
                            tokenService.post('bookmarkEvent/' + event.id).then(function(result) {

                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        } else {
                            $scope.events[$index].Actions.Bookmarked.total -= 1;

                            tokenService.delete('bookmarkEvent/' + event.id, '').then(function(result) {
                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        }
                    } else {
                        $rootScope.openLoginDialog(function() {
                            $scope.heartEvent(event, $index);
                        });
                    }
                }
                $scope.change = function(event, index, state) {
                    switch (state) {
                        case 0:
                            console.log('post 0');
                            $scope.events[index].participation_state = 0;
                            tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                                getParticipationState(event, index);
                            });
                            break;
                        case 1:
                            console.log('post 1');
                            $scope.events[index].participation_state = 1;
                            tokenService.post('rsvpEvent/' + event.id + '/' + 1).then(function(result) {
                                getParticipationState(event, index);
                            });
                            break;
                        case 2:
                            console.log('post 2');
                            $scope.events[index].participation_state = 2;
                            tokenService.post('rsvpEvent/' + event.id + '/' + 2).then(function(result) {
                                getParticipationState(event, index);
                            });
                            break;
                    }
                }
                $scope.getParticipationState = function(event, index) {
                        if ($scope.events[index].participation_state == 1) {
                            return "Going";
                        } else if ($scope.events[index].participation_state == 2) {
                            return "Intrested";
                        } else {
                            return "Not going";
                        }
                    }
                $scope.rsvpEvent = function(event, index, state, $event) {
                    $event.stopPropagation();
                    if ($rootScope.authenticated) {
                        // $scope.events[$index].participation_state = state;
                        switch (state) {
                            case 2:
                                $scope.events[index].participation_state = 2;
                                tokenService.post('rsvpEvent/' + event.id + '/' + 2).then(function(result) {
                                    getParticipationState(event, index);
                                });
                                break;
                            case 1:
                                $scope.events[index].participation_state = 1;
                                tokenService.post('rsvpEvent/' + event.id + '/' + 1).then(function(result) {
                                    getParticipationState(event, index);
                                });
                                break;
                        }
                    } else {
                        $rootScope.openLoginDialog(function() {
                            $scope.rsvpEvent(event, $index);
                        });
                    }
                }
            }
        };
    });

})();
