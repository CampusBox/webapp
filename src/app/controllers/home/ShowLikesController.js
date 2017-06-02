(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('ShowLikesController', [
            '$mdDialog',
            '$scope',
            'title',
            'id',
            'tokenService',
            ShowLikesController
        ]);

    function ShowLikesController($mdDialog, $scope, title, id, tokenService) {
        $scope.likes = [];
        $scope.title = title;
        $scope.loading = true;
        tokenService.get("contentAppreciates/" + id)
            .then(function(response) {
                $scope.loading = false;
                $scope.likes = response.data;
            });
        console.log($scope.likes);
        $scope.cancel = function() {
            $mdDialog.cancel();
        }
    }

})();
