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
                $scope.alloweduiux = [15, 16];
                $scope.url = '';
                $scope.fetchLoading = false;
                $scope.graphicsAdded = false;
                $scope.linkUrl = false;
                $scope.UiUxAdded = false;

                //End Defining variables

                // $rootScope.$on("textAdded", function(event, state) {
                //     if ($scope.linkUrl && $scope.graphicsAdded) {
                //         $scope.checkPublishableUiUx();
                //     }
                // });

                $scope.checkPublishableUiUx = function() {
                    console.log('img ' + $scope.graphicsAdded);
                    $scope.UiUxAdded = $scope.linkUrl && $scope.graphicsAdded;
                }
                $rootScope.$on("ImagesAdded", function(event) {
                    $scope.graphicsAdded = true;
                    $scope.checkPublishableUiUx();
                });
                $scope.onTypeUiUx = function(url) {
                    if ($scope.validateUrl(url)) {
                        $scope.linkUrl = true;
                        $scope.checkPublishableUiUx();
                        $scope.error = '';
                        $scope.fetchLoading = true;
                        var media = {};
                        media.mediaType = 'url';
                        media.url = url;
                        $scope.creativity.items.push(media);
                        allDataService.linkPreviewJson(url)
                            .then(function(data) {
                                $scope.fetchLoading = false;
                                if (data.image != '') {
                                    $scope.graphicsAdded = true;
                                    var length = $scope.creativity.items.length;
                                    var media = {};
                                    media.mediaType = 'image';
                                    media.image = data.image;
                                    $scope.creativity.items.push(media);
                                    $scope.checkPublishableUiUx();
                                }
                                if ($scope.title == '') {
                                    $scope.title = data.title;
                                }
                                console.log($scope.creativity.items);
                            });
                    } else {
                        $scope.linkUrl = false;
                        $scope.checkPublishableUiUx();
                        $scope.error = 'Invalid url!'
                    }
                }

                $scope.removeUiuxImage = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'url') {
                        $scope.graphicsAdded = false;
                        $scope.checkPublishableUiUx();
                    }
                }

            }
        };
    });

})();
