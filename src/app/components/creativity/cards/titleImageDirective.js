(function() {
    'use strict';

    angular.module('app').
    directive('titleImage', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/cards/titleImage.html',
            scope: {
                bar: '=bar',
                content: '=data'
            },
            controller: function($scope, $sce) {
                $scope.content.title = $sce.trustAsHtml($scope.content.title);
                $scope.content.items.thumbnail = $sce.trustAsHtml($scope.content.items.thumbnail);
                console.log($scope.content);
            }
        };
    });

})();
