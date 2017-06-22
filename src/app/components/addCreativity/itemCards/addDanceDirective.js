(function() {
    'use strict';

    angular.module('app').
    directive('addDance', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addDance.html',
            controller: function($scope, addItemService, $sce) {
                //Define Variables
                $scope.videoAdded = false;
                $scope.enterUrl = true;
                //End Defining variables

                $scope.checkVideo = function() {
                    if ($scope.creativity.items[0] == undefined || $scope.videoAdded) {
                        $scope.videoAdded = false;
                    } else {
                        $scope.videoAdded = true;

                    }
                }
                $scope.removeItem = function() {
                    $scope.creativity.items.pop();
                    $scope.videoAdded = false;
                }
                $scope.addItem = function(url) {
                    if ($scope.validateYoutube(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.youtube(url);
                        $scope.setNoembed(url);
                        $scope.checkVideo();
                    } else if ($scope.validateVimeo(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.vimeo(url);
                        $scope.setNoembed(url);
                        $scope.checkVideo();
                    }
                };
            }
        };
    });

})();
