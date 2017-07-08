(function() {
    'use strict';

    angular.module('app')
        .service('eventsActionsService', [
            '$rootScope',
            'tokenService',
            function($rootScope, tokenService) {
                var obj = {};
                obj.heartEvent = function(event, $index) {
                    if ($rootScope.authenticated) {
                        event.Actions.Bookmarked.status = !event.Actions.Bookmarked.status;
                        if (event.Actions.Bookmarked.status) {
                            event.Actions.Bookmarked.total += 1;
                            tokenService.post('bookmarkEvent/' + event.id).then(function(result) {

                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        } else {
                            event.Actions.Bookmarked.total -= 1;

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
                            obj.heartEvent(event, $index);
                        });
                    }
                }
                obj.change = function(event, index, state) {
                    switch (state) {
                        case 0:
                            event.participation_state = 0;
                            tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                                // obj.getParticipationState(event, index);
                            });
                            break;
                        case 1:
                            event.participation_state = 1;
                            tokenService.post('rsvpEvent/' + event.id + '/' + 1).then(function(result) {
                                // obj.getParticipationState(event, index);
                            });
                            break;
                        case 2:
                            event.participation_state = 2;
                            tokenService.post('rsvpEvent/' + event.id + '/' + 2).then(function(result) {
                                // obj.getParticipationState(event, index);
                            });
                            break;
                    }
                }
                obj.getParticipationState = function(event, index) {
                        if (event.participation_state == 1) {
                            return "Going";
                        } else if (event.participation_state == 2) {
                            return "Intrested";
                        } else {
                            return "Not going";
                        }
                    }
                obj.rsvpEvent = function(event, index, state, $event) {
                    // $event.stopPropagation();
                    if ($rootScope.authenticated) {
                        event.participation_state = state;
                        switch (state) {
                            case 2:
                                event.participation_state = 2;
                                tokenService.post('rsvpEvent/' + event.id + '/' + 2).then(function(result) {
                                    // obj.getParticipationState(event, index);
                                });
                                break;
                            case 1:
                                event.participation_state = 1;
                                tokenService.post('rsvpEvent/' + event.id + '/' + 1).then(function(result) {
                                    // obj.getParticipationState(event, index);
                                });
                                break;
                        }
                    } else {
                        $rootScope.openLoginDialog(function() {
                            obj.rsvpEvent(event, $index);
                        });
                    }
                }
                return obj;
            }
        ]);
})();
