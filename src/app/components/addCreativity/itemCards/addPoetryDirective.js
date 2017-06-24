(function() {
    'use strict';

    angular.module('app').
    directive('addPoetry', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addPoetry.html',
            controller: function($scope, addItemService, $sce, $rootScope) {
                //Define Variables
                $scope.allowedPoetry = [2];
                $scope.videoAdded = false;
                $scope.poetryAdded = false;
                $scope.enterUrl = true;
                //End Defining variables

                $scope.checkPoetry = function() {
                        console.log('$scope.poetryAdded');
                    if ($scope.creativity.items[0] == undefined || $scope.videoAdded) {
                        $scope.videoAdded = false;
                        $scope.poetryAdded = false;
                    } else {
                        $scope.videoAdded = true;
                        $scope.poetryAdded = true;

                    }
                }
                $scope.removePoetry = function() {
                    $scope.creativity.items.pop();
                    $scope.videoAdded = false;
                    $scope.poetryAdded = false;
                }
                $scope.addPoetryVideo = function(url) {
                    if ($scope.validateYoutube(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.youtube(url);
                        $scope.setNoembed(url, 1);
                        $scope.checkPoetry();
                    } else if ($scope.validateSoundcloud(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.soundcloud(url);
                        $scope.setNoembed(url, 1);
                        $scope.checkPoetry();
                    } else if ($scope.validateVimeo(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.vimeo(url);
                        $scope.setNoembed(url, 1);
                        $scope.checkPoetry();
                    } else {
                        $scope.error = "Enter a valid Youtube or Vimeo url.";
                    }
                };
            }
        };
    });

})();
