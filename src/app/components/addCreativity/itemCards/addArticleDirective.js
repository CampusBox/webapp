(function() {
    'use strict';

    angular.module('app').
    directive('addArticle', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addArticle.html',
            controller: function($scope, addItemService, $sce, $rootScope) {
                //Define Variables
                $scope.allowedArticle = [1, 20, 21];
                $scope.enterUrl = true;
                
                $scope.inputActive = false;
                $scope.removeArticleItem = function(index) {
                    $scope.creativity.items.splice(index, 1);
                }
                $scope.activateMediaInput = function() {
                    if ($scope.inputActive) {
                        $scope.inputActive = false;
                    } else {
                        $scope.inputActive = true;

                    }
                }
                $scope.addArticleMedia = function(url) {
                    var index = $scope.creativity.items.length;
                    if ($scope.validateYoutube(url)) {
                        addItemService.youtube(url);
                        $scope.setNoembed(url, index);
                        $scope.activateMediaInput();
                    } else if ($scope.validateSoundcloud(url)) {
                        addItemService.soundcloud(url);
                        $scope.setNoembed(url, index);
                        $scope.activateMediaInput();
                    } else if ($scope.validateVimeo(url)) {
                        addItemService.vimeo(url);
                        $scope.setNoembed(url, index);
                        $scope.activateMediaInput();
                    } else {
                        $scope.error = "Enter a valid Youtube or Vimeo url.";
                    }
                };
            }
        };
    });

})();
