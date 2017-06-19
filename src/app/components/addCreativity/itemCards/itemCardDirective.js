(function() {
    'use strict';

    angular.module('app').
    directive('itemCard', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/itemCard.html',
            scope: {
                type: '=type',
            },

            controller: function($scope, addItemService) {
                $scope.addItem = function(url, heading) {
                    $scope.creativity.items = [];
                    addItemService.submitUrl(url, heading);
                };
            }
        };
    });

})();
