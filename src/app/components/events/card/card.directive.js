(function() {
    'use strict';

    angular.module('app').
    directive('card', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/events/card/card.html',

            controller: function($mdDialog, $scope, $element, tokenService, Upload, $timeout, $location, $state, $rootScope) {
                console.log("testing");
                $scope.grid = false;
                $scope.width = 28;
                $scope.offset = 0;
                $scope.moreItems = true;
                $scope.loading = false;
                $scope.events = [];
                $scope.types = [
                    { 'id': 0, 'title': 'All', },
                    { 'id': 1, 'title': 'Competition', },
                    { 'id': 2, 'title': 'Conference', },
                    { 'id': 3, 'title': 'Exhibition', },
                    { 'id': 4, 'title': 'Performance', },
                    { 'id': 5, 'title': 'Workshop', },
                    { 'id': 6, 'title': 'Seminar', },
                    { 'id': 7, 'title': 'Other', }
                ];
                $scope.timings = [
                    { 'id': 0, 'title': 'All' },
                    { 'id': 1, 'title': 'Today' },
                    { 'id': 2, 'title': 'Tommorrow' },
                    { 'id': 3, 'title': 'This Week' },
                    { 'id': 4, 'title': 'This Month' }
                ];
                $scope.colleges = [
                    { 'id': 0, 'title': 'All', },
                    { 'id': 1, 'title': 'My College', },
                    { 'id': 2, 'title': 'Other colleges' }
                ];
                tokenService.get("minievents?limit=4")
                    .then(function(tableData) {
                        $scope.events = tableData.data;
                        console.log(tableData.data);
                    });
                $scope.report = function() {
                    console.log('testing report function');
                };

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
