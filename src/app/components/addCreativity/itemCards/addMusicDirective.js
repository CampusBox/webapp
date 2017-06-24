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
                        $scope.publishable = false;
                    } else {
                        $scope.musicAdded = true;
                        $scope.publishable = true;
                    }
                }
                $scope.removeItem = function() {
                    $scope.creativity.items.pop();
                    $scope.musicAdded = false;
                    $scope.publishable = false;
                }
                $scope.addMusic = function(url) {
                    if ($scope.validateYoutube(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        $scope.setNoembed(url);
                        $scope.checkMusic();
                        addItemService.youtube(url);
                    } else if ($scope.validateSoundcloud(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.soundcloud(url);
                        $scope.setNoembed(url);
                        $scope.checkMusic();
                    } else if ($scope.validateVimeo(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        addItemService.vimeo(url);
                        $scope.setNoembed(url);
                        $scope.checkMusic();
                    } else {
                        $scope.error = 'Enter a valid Youtube, Soundcloud or Vimeo url.'
                    }
                };
            }
        };
    });

})();
