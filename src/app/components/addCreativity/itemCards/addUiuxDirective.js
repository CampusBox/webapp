(function() {
    'use strict';

    angular.module('app').
    directive('addUiux', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/adduiux.html',
            controller: function($scope, addItemService, $sce, allDataService, $rootScope) {
                //Define Variables
                $scope.url = '';
                $scope.fetchLoading = false;
                $scope.graphicsAdded = false;
                $scope.linkUrl = false;
                $scope.UiUxAdded = false;

                //End Defining variable

                $scope.checkPublishableUiUx = function() {
                    $scope.UiUxAdded = $scope.linkUrl || $scope.graphicsAdded;
                }
                $scope.removeUiUxItem = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'image') {
                        $scope.linkUrl = false;
                        $scope.checkPublishableUiUx();
                    }
                }
                $rootScope.$on("ImagesAdded", function(event) {
                    $scope.graphicsAdded = true;
                    $scope.drawingAdded = false; // On adding images this variable is set true in add drawing directive so we have to set it false here !
                    $scope.checkPublishableUiUx();
                });
                $scope.onTypeUiUx = function(url) {
                    if ($scope.validateUrl(url)) {
                        $scope.linkUrl = true;
                        $scope.checkPublishableUiUx();
                        $scope.error = '';
                        $scope.fetchLoading = true;
                        addItemService.iframely(url, "embed")
                            .then(function(response) {
                                $scope.fetchLoading = false;
                                if (response != undefined) {
                                    if ($scope.title == '') {
                                        var length = $scope.creativity.items.length;
                                        $scope.title = $scope.creativity.items[length - 1].display.title;
                                    }
                                }
                                console.log($scope.creativity.items);
                            });
                    } else {
                        $scope.fetchLoading = false;
                        $scope.linkUrl = false;
                        $scope.checkPublishableUiUx();
                        $scope.error = 'Invalid url!'
                    }
                }

                $scope.removeUiuxImage = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    console.log($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'embed');
                    if ($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'embed') {
                        $scope.graphicsAdded = false;
                        $scope.drawingAdded = false; // On adding images this variable is set true in add drawing directive so we have to set it false here !
                        $scope.checkPublishableUiUx();
                    }
                }

            }
        };
    });

})();
