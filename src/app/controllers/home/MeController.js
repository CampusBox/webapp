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
            console.log('me controller logout function');
            localStorage.clear();
            // $state.go('static.signUp');
            $rootScope.openLoginDialog();
        };
        tokenService.get("notifications")
            .then(function(response) {
                $scope.notifications = response;
                $scope.loading = false;
            });


    };
});
