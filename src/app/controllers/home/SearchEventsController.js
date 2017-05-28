(function() {

    angular
        .module('app')
        .controller('SearchEventsController', [
            '$mdDialog',
            '$scope',
            '$element',
            'tokenService',
            'Upload',
            '$timeout',
            '$location',
            '$state',
            '$stateParams',
            SearchEventsController
        ]);

    function SearchEventsController($mdDialog, $scope, $element, tokenService, Upload, $timeout, $location, $state, $stateParams) {
        var vm = this;
        $scope.grid = false;
        $scope.width = 28;
        $scope.query = $stateParams.query;
        $scope.searchText = $stateParams.query;
        $scope.events = [];
        $scope.loading = true;
        tokenService.get("search/events/" + $scope.query)
            .then(function(tableData) {

                $scope.loading = false;
                $scope.events = $scope.events.concat(tableData.data);
                console.log($scope.events);
            });

        $scope.filters = [];
        $scope.showEvent = function(ev, index) {
            $mdDialog.show({
                    controller: 'SingleEventController',
                    templateUrl: 'app/views/partials/singleEvent.html',
                    parent: angular.element(document.body),
                    locals: {
                        events: $scope.events,
                        index: index
                    },
                    closeTo: '#left',
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true 
                });
        };
        $scope.searchTypes = [];
        // {
        //     'title': 'events',
        //     'icon': 'calendar'
        // }, {
        //     'title': 'creativity',
        //     'icon': 'all-inclusive'
        // }, {
        //     'title': 'students',
        //     'icon': 'school'
        // }];
        $scope.report = function() {
            console.log('testing report function');
        }

        $scope.heart = function(event, $index) {
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
        }
        $scope.rsvpEvent = function(event, $index) {
            $scope.events[$index].Actions.Participants.status = !$scope.events[$index].Actions.Participants.status;
            if ($scope.events[$index].Actions.Participants.status) {
                $scope.events[$index].Actions.Participants.total += 1;
                tokenService.post('rsvpEvent/' + event.id).then(function(result) {

                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.events[$index].Actions.Participants.total -= 1;

                tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }

        $scope.searched = function(item, text) {
            if (item == 'events') {
                $state.go('home.searchEvents', { query: text });
            } else if (item == 'creativity') {
                $state.go('home.searchCreativity', { query: text });
            } else if (item == 'students') {
                $state.go('home.searchStudents', { query: text });
            }
        };
        $scope.searchTerm;
        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };
        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });
        vm.activated = true;
    }

})();
