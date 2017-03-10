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
            EventsController
        ]);

    function EventsController($mdDialog, $scope, $element, tokenService, Upload, $timeout, $location, $state) {
        var vm = this;
        $scope.grid = false;
        $scope.width = 18;
        $scope.events = [];
        $scope.filters=[];
        $scope.showEvent = function(ev, index) {
            $mdDialog.show({
                    controller: 'SingleEventController',
                    templateUrl: 'app/views/partials/singleEvent.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    locals: {
                        events: $scope.events,
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
       $scope.openEvent = function(event){
        $location.path('/singleEvent/'+event.id);
       }
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
        $scope.update = function(event, $index) {
            $scope.events[$index].Actions.Participants.status = !$scope.events[$index].Actions.Participants.status;
            if ($scope.events[$index].Actions.Participants.status) {
                $scope.events[$index].Actions.Participants.total += 1;
                tokenService.post('ParticipantsEvent/' + event.id).then(function(result) {

                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.events[$index].Actions.Participants.total -= 1;

                tokenService.delete('ParticipantsEvent/' + event.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        $scope.serverBusy = false;


        $scope.myPagingFunction = function() {
            $scope.serverBusy = true;
            tokenService.get("events")
                .then(function(tableData) {
            console.log('events called');
                    $scope.serverBusy = false;
                    $scope.events = $scope.events.concat(tableData.data);
                    console.log($scope.events);
                });
        }
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
