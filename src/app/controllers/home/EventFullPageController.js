(function() {

    angular
        .module('app')
        .controller('EventsFullPageController', [
            '$mdDialog',
            '$scope',
            '$element',
            'tokenService',
            'Upload',
            '$timeout',
            EventsFullPageController
        ]);

    function EventsFullPageController($mdDialog, $scope, $element, tokenService, Upload, $timeout) {
        var vm = this;
        $scope.grid = false;
        $scope.width = 18;
        $scope.event = [];

        $scope.serverBusy = false;
        $scope.serverBusy = true;
        tokenService.get("events")
            .then(function(tableData) {
                $scope.serverBusy = false;
                $scope.events = $scope.events.concat(tableData.data);
            });

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
            // The md-select directive eats keydown events for some quick select
            // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });
        vm.activated = true;
    }

})();
