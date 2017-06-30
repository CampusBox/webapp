(function() {
    'use strict';

    angular.module('app').
    directive('titleContent', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/cards/titleContent.html',
            scope: {
                bar: '=bar',
                content: '=data'
            },
            controller: function($scope, $sce) {
                $scope.content.items.text = $sce.trustAsHtml($scope.content.items.text);
                $scope.content.title = $sce.trustAsHtml($scope.content.title);
                console.log($scope.content);
            }
        };
    });

})();
