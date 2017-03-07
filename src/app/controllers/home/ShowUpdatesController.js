
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

    }
})();
