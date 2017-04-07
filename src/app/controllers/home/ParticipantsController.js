(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('ParticipantsController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            'eventId',
            ParticipantsController
        ]);

    function ParticipantsController($mdDialog, $scope, tokenService, eventId) {
        console.log(eventId);
        tokenService.get("participants/" + eventId)
            .then(function(participants) {
                console.log(participants)
                $scope.participants = participants;
            });

        $scope.save = function() {
            $scope.title = $scope.editableTitle;
            $scope.disableEditor();
        };
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
})();
