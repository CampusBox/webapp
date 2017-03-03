(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('UpdatesController', [
            '$mdDialog',
            '$scope',
            'updates',
            UpdatesController
        ]);

    function UpdatesController($mdDialog, $scope, updates) {
        console.log(updates);

        $scope.title = "Welcome to this demo!";
        $scope.editorEnabled = false;

        $scope.enableEditor = function() {
            $scope.editorEnabled = true;
            $scope.editableTitle = $scope.title;
        };

        $scope.disableEditor = function() {
            $scope.editorEnabled = false;
        };

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
