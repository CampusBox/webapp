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
                $scope.rsvpEvent = function($event, event, $index, state) {
                    $event.stopPropagation();
                    if ($rootScope.authenticated) {
                        // $scope.events[$index].participation_state = state;
                        switch (state) {
                            case 2:
                                console.log('intrested button pressed');
                                // intrested button pressed
                                if ($scope.events[$index].participation_state == 2) {
                                    //person was intrested before and is'nt now
                                    $scope.events[$index].participation_state = 0;
                                    tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                                        if (result.status != 'error') {
                                            console.log(result.status);
                                        } else {
                                            console.log(result);
                                        }
                                    });
                                } else if ($scope.events[$index].participation_state == 1) {
                                    //person was going but isnt intrested now
                                    $scope.events[$index].participation_state = 0;
                                    tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                                        if (result.status != 'error') {
                                            console.log(result.status);
                                        } else {
                                            console.log(result);
                                        }
                                    });
                                } else {
                                    // person wasnt intrested before but is now
                                    $scope.events[$index].participation_state = 2;
                                    tokenService.post('rsvpEvent/' + event.id + '/' + 2).then(function(result) {
                                        if (result.status != 'error') {
                                            console.log(result.status);
                                        } else {
                                            console.log(result);
                                        }
                                    });
                                }
                                break;
                            case 1:
                                console.log('going button pressed');
                                if ($scope.events[$index].participation_state == 2) {
                                    // person intrested before and now he's going too
                                    $scope.events[$index].participation_state = 1;
                                    tokenService.post('rsvpEvent/' + event.id + '/' + 1).then(function(result) {
                                        if (result.status != 'error') {
                                            console.log(result.status);
                                        } else {
                                            console.log(result);
                                        }
                                    });
                                } else if ($scope.events[$index].participation_state == 1) {
                                    // person is not going anymore
                                    $scope.events[$index].participation_state = 0;
                                    tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                                        if (result.status != 'error') {
                                            console.log(result.status);
                                        } else {
                                            console.log(result);
                                        }
                                    });
                                } else {
                                    // person was not going before but is going now
                                    tokenService.post('rsvpEvent/' + event.id + '/' + 1).then(function(result) {
                                        if (result.status != 'error') {
                                            console.log(result.status);
                                        } else {
                                            console.log(result);
                                        }
                                    });
                                }


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
