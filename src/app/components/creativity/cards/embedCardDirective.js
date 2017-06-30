(function() {
    'use strict';

    angular.module('app').
    directive('embedCard', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/cards/embedCard.html',
            scope: {
                bar: '=bar',
                content: '=data'
            },
            controller: function($scope, $sce) {
                $scope.content.items.embed = $sce.trustAsHtml($scope.content.items.embed);
            }
        };
    });

})();
