(function() {
    'use strict';

    angular
        .module('app')
        .directive('filters', filtersDirective);

    function filtersDirective() {
        return {
            restrict: 'E',
            scope: {
                events: '=',
                search: '=',
                update: '=',
                show: '&',
                updateIcon: '&',
                report: '&'
            },
            templateUrl: 'app/components/events/filters/filters.html',
            link: function($mdDialog, $scope, $element, tokenService, Upload, $timeout, $location, $state, $rootScope) {
                console.log("this is directive");
                $scope.grid = false;
                $scope.width = 28;
                $scope.offset = 0;
                $scope.moreItems = true;
                $scope.loading = false;
                $scope.events = [];
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


                $scope.clearSearchTerm = function() {
                    $scope.searchTerm = '';
                };
                $scope.applyFilters = function(filters) {
                    tokenService.post('eventsFilter', filters).then(function(result) {

                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                };

            }
        };
    }
})();
