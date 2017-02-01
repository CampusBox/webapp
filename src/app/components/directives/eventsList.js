(function() {
    'use strict';

    angular
        .module('app')
        .directive('eventsSection', eventsSectionDirective);

    function eventsSectionDirective() {
        return {
            restrict: 'E',
            scope: {
                title: '@',
                theme: '@',
                events: '='
            },
            template: '' +
                      '<table id="table" class="table table-hover table-bordered">'+
                        '<thead>'+
                            '<tr>'+
                                '<th>#</th>'+
                                '<th>Name</th>'+
                                '<th>Venue</th>'+
                                '<th>Progress</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            '<tr ng-repeat="data in events track by $index">'+
                                '<td data-title="ID">{{$index + 1}}</td>'+
                                '<td data-title="Issue">{{data.name}}</td>'+
                                '<td data-title="Status">{{data.venue}}</td>'+
                                '<td data-title="Progress">'+
                                    '<md-progress-linear class="table-progress {{data.class}}" md-mode="determinate" value={{data.progress}}>'+
                                    '</md-progress-linear>'+
                                '</td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>',
            link : function(scope, element, attrs) {
            }
        };
    }
})();