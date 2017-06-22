(function() {
    'use strict';

    angular.module('app').
    directive('eventActions', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/events/card/actions/eventActions.html',

            controller: function($mdDialog, $scope, $element, tokenService,  $timeout, $location, $state, $rootScope, eventsActionsService) {

                $scope.heartEvent = function(event, $index) {
                    eventsActionsService.heart(event, $index);
                    $scope.getParticipationState(event, index);

                }
                $scope.change = function(event, index, state) {
                    console.log('before: ' + event.participation_state);
                    eventsActionsService.change(event, index, state);
                    console.log('after: ' + event.participation_state);
                    $scope.getParticipationState(event, index);
                }
                $scope.getParticipationState = function(event, index) {
                    if (event.participation_state == 1) {
                        return "Going";
                    } else if (event.participation_state == 2) {
                        return "Intrested";
                    } else {
                        return "Not going";
                    }
                    }
                $scope.rsvpEvent = function(event, index, state, $event) {
                    console.log('before: ' + event.participation_state);
                    $scope.getParticipationState(event, index);
                    console.log('after: ' + event.participation_state);
                    eventsActionsService.rsvpEvent(event, index, state, $event);
                }
            }
        };
    });

})();
