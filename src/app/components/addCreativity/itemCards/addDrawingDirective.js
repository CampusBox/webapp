(function() {
    'use strict';

    angular.module('app').
    directive('addDrawing', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addDrawing.html',
            controller: function($scope, addItemService, $sce, allDataService, $rootScope, $q) {
                //Define Variables
                $scope.allowedDrawing = [4, 5, 6, 7, 12];
                $scope.inputActive = false;
                $scope.enterUrl = true;
                //End Defining variables

                $rootScope.$on("ImagesAdded", function(event) {
                    $scope.drawingAdded = true;
                });
                $scope.activateInput = function() {
                    if ($scope.inputActive) {
                        $scope.inputActive = false;
                    } else {
                        $scope.inputActive = true;

                    }
                }

                // $scope.setTitle = function() {
                //     console.log('$scope.title');
                //     
                // }
                $scope.addInstagram = function(url) {
                    if (addItemService.validateUrl(url)) {
                        $scope.activateInput();
                        addItemService.iframely(url, "embed").then(function(response) {
                            if (response != undefined) {
                                $scope.drawingAdded = true;
                                if ($scope.title == '') {
                                    var length = $scope.creativity.items.length;
                                    $scope.title = $scope.creativity.items[length - 1].display.title;
                                }
                            }
                        });
                    } else {
                        $scope.error = 'Invalid Instagtam image url!'
                    }
                }
                $scope.removeDrawing = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length == 1) {
                        $scope.drawingAdded = false;
                    }
                }

            }
        };
    });

})();
