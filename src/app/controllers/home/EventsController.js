(function() {

    angular
        .module('app')
        .controller('EventsController', [
            '$mdDialog',
            '$scope',
            '$element',
            'tokenService',
            'Upload',
            '$timeout',
            '$location',
            '$state',
            '$rootScope',
            EventsController
        ]);

    function EventsController($mdDialog, $scope, $element, tokenService, Upload, $timeout, $location, $state, $rootScope) {
        var vm = this;
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

        // ####################################################################################
        // EVENTS OLD PAGING FUNCTION DONT REMOVE
        // $scope.myPagingFunction = function() {
        //     console.log('paging');
        //     if ($scope.loading == false && $scope.moreItems == true) {
        //         $scope.loading = true;
        //         tokenService.get("events?limit=2&offset=" + $scope.offset)
        //             .then(function(tableData) {
        //                 $scope.loading = false;
        //                 if (tableData.data.length < 2) {
        //                     console.log("more items: " + $scope.moreItems);
        //                     $scope.moreItems = false;
        //                 }
        //                 $scope.events = $scope.events.concat(tableData.data);
        //                 $scope.offset = tableData.meta.offset;
        //                 console.log($scope.offset);
        //             });
        //     }
        // };
        // ####################################################################################
        tokenService.get("minievents")
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
        $scope.rsvpEvent = function(event, $index, state) {
            if ($rootScope.authenticated) {
                // $scope.events[$index].participants.status = state;
                switch (state) {
                    case 2:
                    console.log('intrested button pressed');
                        // intrested button pressed
                        if ($scope.events[$index].participants.status == 2) {
                            //person was intrested before and is'nt now
                            $scope.events[$index].participants.status = 0;
                            tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        } else if ($scope.events[$index].participants.status == 1) {
                            //person was going but isnt intrested now
                            $scope.events[$index].participants.status = 0;
                            tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        } else {
                            // person wasnt intrested before but is now
                            $scope.events[$index].participants.status = 2;
                            tokenService.post('rsvpEvent/' + event.id + 2).then(function(result) {
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
                        if ($scope.events[$index].participants.status == 2) {
                            // person intrested before and now he's going too
                            $scope.events[$index].participants.status = 1;
                            tokenService.post('rsvpEvent/' + event.id + 1).then(function(result) {
                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        } else if ($scope.events[$index].participants.status == 1) {
                            // person is not going anymore
                            $scope.events[$index].participants.status = 0;
                            tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        } else {
                            // person was not going before but is going now
                            tokenService.post('rsvpEvent/' + event.id + 1).then(function(result) {
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


        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };
        $scope.applyFilters = function(filters) {
            tokenService.post('eventsFilter', filters).then(function(result) {

                if (result.status != 'error') {
                    console.log(result.status);
                } else {
                    console.log(result);
                }
            });
        };
        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });
        vm.activated = true;
    }

})();
