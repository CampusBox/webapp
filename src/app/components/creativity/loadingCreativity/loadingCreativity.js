(function() {
    'use strict';
    angular.module('app').
    directive('loadingCreativity', function() {
        return {
        	restrict: "E",
            templateUrl: 'app/components/creativity/loadingCreativity/loadingCreativity.html',
             controller: function( $scope) {
                 $scope.creativityLoading = false;
            }
        };
    });
})();
