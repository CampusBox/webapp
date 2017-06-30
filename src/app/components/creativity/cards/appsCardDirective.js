(function() {
    'use strict';

    angular.module('app').
    directive('appsCard', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/cards/appsCard.html',
            scope: {
                bar: '=bar',
                content: '=data'
            },
            controller: function($scope, $sce) {
                console.log($scope.content);
                $scope.content.title = $sce.trustAsHtml($scope.content.title);
                $scope.content.items.text = $sce.trustAsHtml($scope.content.items.text);
                $scope.content.items.icon = $sce.trustAsHtml($scope.content.items.icon);
            }
        };
    });

})();
