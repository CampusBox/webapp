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
                    $scope.$emit("publishable", $scope.UiUxAdded);
                }
                $scope.removeUiUxItem = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'image') {
                        $scope.linkUrl = false;
                        $scope.checkPublishableUiUx();
                    }
                }
                $rootScope.$on("ImagesAdded", function(event) {
                    console.log('uiux ;jasncals');
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
                                $scope.inputActive = false;
                            }).catch(function(err) {
                                console.log("Retrying!");
                                addItemService.iframely(url, "embed")
                                    .then(function(response) {
                                        $scope.fetchLoading = false;
                                        $scope.inputActive = false;
                                    }).catch(function(err) {
                                        $scope.fetchLoading = false;
                                        $scope.error = err.message;
                                    });
                            });
                    } else {
                        $scope.fetchLoading = false;
                        $scope.linkUrl = false;
                        $scope.checkPublishableUiUx();
                        $scope.error = 'Invalid url!';
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
