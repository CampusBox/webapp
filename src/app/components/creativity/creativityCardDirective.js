(function() {
    'use strict';

    angular.module('app').
    directive('creativityCard', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/creativityCard.html',
            scope: {
                bar: '=bar',
                content: '=data'
            },
            controller: function() {




            }
        };
    });

})();
