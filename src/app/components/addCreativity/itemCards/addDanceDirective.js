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
                    if ($scope.validateYoutube(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.youtube(url);
                        $scope.setNoembed(url, 1);
                        $scope.checkVideo();
                    } else if ($scope.validateVimeo(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.vimeo(url);
                        $scope.setNoembed(url, 1);
                        $scope.checkVideo();
                    } else {
                        $scope.error = "Enter a valid Youtube or Vimeo url.";
                    }
                };
            }
        };
    });

})();
