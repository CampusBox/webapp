(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('ParticipantsController', [
            '$mdDialog',
            '$scope',
            ParticipantsController
        ]);

    function ParticipantsController($mdDialog, $scope) {
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
