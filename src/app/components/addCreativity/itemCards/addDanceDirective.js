(function() {
    'use strict';

    angular.module('app').
    directive('addDance', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addDance.html',
            controller: function($scope, addItemService, $sce, $rootScope) {
                //Define Variables
                $scope.allowedDance = [8, 3, 13, 14];
                $scope.videoAdded = false;
                $scope.danceAdded = false;
                $scope.enterUrl = true;
                //End Defining variables

                $scope.checkVideo = function() {
                    console.log('$scope.danceAdded');
                    if ($scope.creativity.items[0] == undefined || $scope.videoAdded) {
                        $scope.videoAdded = false;
                        $scope.danceAdded = false;
                    } else {
                        $scope.videoAdded = true;
                        $scope.danceAdded = true;

                    }
                }
                $scope.removeDance = function() {
                    $scope.creativity.items.pop();
                    $scope.videoAdded = false;
                    $scope.danceAdded = false;
                }
                $scope.addDanceVideo = function(url) {
                    if (addItemService.validateUrl(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.iframely(url, "embed");
                        $scope.checkVideo();
                    } else {
                        $scope.error = "Enter a valid url.";
                    }
                };
            }
        };
    });

})();
