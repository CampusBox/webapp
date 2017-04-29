(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('SingleEventController', [
            '$mdDialog',
            '$scope',
            'Upload',
            '$timeout',
            'tokenService',
            '$stateParams',
            '$sce',
            SingleEventController
        ]);


    function SingleEventController($mdDialog, $scope, Upload, $timeout, tokenService, $stateParams, $sce) {

        $scope.loading = true;
        $scope.logout = function() {
            localStorage.clear();
            $state.go('static.signUp');
        };
        tokenService.get("notifications")
            .then(function(response) {
                $scope.notifications = response;
                $scope.loading = false;
            });


    };
});
