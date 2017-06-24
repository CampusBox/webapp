(function() {
    'use strict';

    angular.module('app').
    directive('addArticle', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addArticle.html',
            controller: function($scope, addItemService, $sce) {
                //Define Variables
                $scope.allowedArticle = [1, 2, 20, 21];
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
                $scope.addVideo = function(url) {
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
                    } else {
                        $scope.error = "Enter a valid Youtube or Vimeo url.";
                    }
                };
            }
        };
    });

})();
