(function() {
    'use strict';
    angular.module('app').
    directive('loadingEvents', function() {
        return {
        	restrict: "E",
            templateUrl: 'app/components/events/loadingEvents/loadingEvents.html',
             controller: function( $scope) {
                 $scope.eventLoading = true;
            }
        };
    });
})();
