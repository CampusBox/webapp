(function() {
    'use strict';

    angular.module('app').
    directive('eventCard', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/events/card/eventCard.html',
            scope: {
                bar: '=bar',
                event: '=data'
            },

            controller: function($mdDialog, $scope, $element, tokenService, $timeout, $location, $state, $rootScope) {

                $scope.types = [
                    { 'id': 0, 'title': 'All', },
                    { 'id': 1, 'title': 'Competition', },
                    { 'id': 2, 'title': 'Conference', },
                    { 'id': 3, 'title': 'Exhibition', },
                    { 'id': 4, 'title': 'Performance', },
                    { 'id': 5, 'title': 'Workshop', },
                    { 'id': 6, 'title': 'Seminar', },
                    { 'id': 7, 'title': 'Other', }
                ];
                $scope.timings = [
                    { 'id': 0, 'title': 'All' },
                    { 'id': 1, 'title': 'Today' },
                    { 'id': 2, 'title': 'Tommorrow' },
                    { 'id': 3, 'title': 'This Week' },
                    { 'id': 4, 'title': 'This Month' }
                ];
                $scope.colleges = [
                    { 'id': 0, 'title': 'All', },
                    { 'id': 1, 'title': 'My College', },
                    { 'id': 2, 'title': 'Other colleges' }
                ];

            }
        };
    });

})();
