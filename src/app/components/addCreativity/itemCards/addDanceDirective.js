(function() {
    'use strict';

    angular.module('app').
    directive('addDance', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addDance.html',
            controller: function($scope, addItemService, $sce) {
                $scope.videoAdded = false;
                $scope.enterUrl = true;
                $scope.checkVideo = function() {
                    if ($scope.creativity.items[0] == undefined || $scope.videoAdded) {
                        $scope.videoAdded = false;
                    } else {
                        $scope.videoAdded = true;

                    }
                }
                $scope.removeItem = function() {
                    // console.log($scope.creativity.items[2]);
                    $scope.creativity.items.pop();
                    $scope.videoAdded = false;
                }
                $scope.addItem = function(url, heading) {
                    if ($scope.creativity.items.length > 1) {
                        $scope.creativity.items.pop();
                    }
                    // $scope.removeItem();
                    addItemService.submitUrl(url, heading);
                    $scope.setNoembed(url);
                    $scope.checkVideo();
                };
            }
        };
    });

})();
