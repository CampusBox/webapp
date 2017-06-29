(function() {
    'use strict';

    angular.module('app').
    directive('addMusic', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addMusic.html',
            controller: function($scope, addItemService, $sce) {
                //Define Variables
                $scope.allowedMusic = [9, 10, 11];
                $scope.musicAdded = false;
                $scope.enterUrl = true;
                //End Defining variables

                $scope.checkMusic = function() {
                    if ($scope.creativity.items[0] == undefined || $scope.musicAdded) {
                        $scope.musicAdded = false;
                    } else {
                        $scope.musicAdded = true;
                    }
                }
                $scope.removeMusic = function() {
                    $scope.creativity.items.pop();
                    $scope.musicAdded = false;
                }
                $scope.addMusic = function(url) {
                    if (addItemService.validateUrl(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.iframely(url, "embed");
                        $scope.checkMusic();
                    }else {
                        $scope.error = 'Enter a valid url.'
                    }
                };
            }
        };
    });

})();
