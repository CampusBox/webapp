(function() {
    'use strict';

    angular.module('app').
    directive('addDance', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addDance.html',
            controller: function($scope, addItemService, $sce) {
                $scope.addItem = function(url, heading) {
                    $scope.creativity.items = [];
                    addItemService.submitUrl(url, heading);
                    $scope.setNoembed(url);
                };
            }
        };
    });

})();
