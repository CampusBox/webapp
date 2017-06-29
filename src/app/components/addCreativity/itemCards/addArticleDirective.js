(function() {
    'use strict';

    angular.module('app').
    directive('addArticle', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addArticle.html',
            controller: function($scope, addItemService, $sce, $rootScope, allDataService) {
                //Define Variables
                $scope.allowedArticle = [1, 20];
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
                    if (addItemService.validateUrl(url)) {
                        addItemService.iframely(url);
                        $scope.activateMediaInput();
                    } else {
                        $scope.error = "Enter a valid  url.";
                    }
                };
            }
        };
    });

})();
