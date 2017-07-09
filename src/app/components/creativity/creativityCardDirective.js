(function() {
    'use strict';

    angular.module('app').
    directive('creativityCard', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/creativityCard.html',
            scope: {
                actions: '=actions',
                content: '=data',
                showcategory: '=showcategory'
            },
            controller: function($scope, $sce, creativityCategories) {
                $scope.typesByID = creativityCategories.typesByID;

                $scope.getTrustedHtml = function(data) {
                    return $sce.trustAsHtml(data);
                }
            }
        };
    });

})();