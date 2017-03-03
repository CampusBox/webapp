(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('SingleEventController', [
            '$mdDialog',
            '$scope',
            'updates',
            SingleEventController
        ]);

    function SingleEventController($mdDialog, $scope, updates) {

    }
})();
