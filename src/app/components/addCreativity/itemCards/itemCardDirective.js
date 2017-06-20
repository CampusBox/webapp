(function() {
    'use strict';

    angular.module('app').
    directive('itemCard', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/itemCard.html',
            controller: function($scope, addItemService, allDataService) {
                $scope.addItem = function(url, heading) {
                    $scope.creativity.items = [];
                    addItemService.submitUrl(url, heading);
                };
                $scope.setNoembed = function(url) {
                    allDataService.noembedJson(url)
                        .then(function(data) {
                            $scope.creativity.items[0].noembed = data;
                            if ($scope.title == '') {
                                $scope.title = $scope.creativity.items[0].noembed.title;
                            }
                        });
                };
            }
        };
    });

})();
