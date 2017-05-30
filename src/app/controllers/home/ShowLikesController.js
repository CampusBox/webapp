(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('ShowLikesController', [
            '$mdDialog',
            '$scope',
            'title',
            ShowLikesController
        ]);

    function ShowLikesController($mdDialog, $scope, title) {
        $scope.title = title;
        $scope.cancel = function(){
            $mdDialog.cancel();
        }
        $scope.about="about about about about about about about about about about about about about about about about about about about about about about about about "
        console.log($scope.likes);
    }

})();
