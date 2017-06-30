(function() {
    'use strict';

    angular.module('app').
    directive('addWebsite', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addWebsite.html',
            controller: function($scope, addItemService, $sce, allDataService, $rootScope) {
                //Define Variables
                $scope.url = '';
                $scope.fetchLoading = false;
                $scope.imageAdded = false;
                $scope.urlAdded = false;
                $scope.websiteAdded = false;

                //End Defining variables

                $scope.checkPublishableWebsite = function() {
                    $scope.websiteAdded = $scope.urlAdded && $scope.imageAdded;
                    $scope.$emit("publishable", $scope.websiteAdded);
                }
                $rootScope.$on("ImagesAdded", function(event) {
                    $scope.imageAdded = true;
                    $scope.drawingAdded = false; // On adding images this variable is set true in add drawing directive so we have to set it false here !
                    $scope.UiUxAdded = false; // On adding images this variable is set true in add uiux directive so we have to set it false here !
                    $scope.checkPublishableWebsite();
                });
                $scope.removeWebsiteItem = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'image') {
                        $scope.urlAdded = false;
                        $scope.checkPublishableWebsite();
                    }
                }
                $scope.onType = function(url) {
                    if ($scope.validateUrl(url)) {
                        $scope.urlAdded = true;
                        $scope.checkPublishableWebsite();
                        $scope.error = '';
                        $scope.fetchLoading = true;
                        addItemService.iframely(url, "tech")
                            .then(function(response) {
                                $scope.fetchLoading = false;
                                if (response != undefined) {
                                    if ($scope.title == '') {
                                        var length = $scope.creativity.items.length;
                                        $scope.title = $scope.creativity.items[length - 1].display.title;
                                    }
                                }
                            });
                    } else {
                        $scope.fetchLoading = false;
                        $scope.urlAdded = false;
                        $scope.checkPublishableWebsite();
                        $scope.error = 'Invalid url!'
                    }
                    console.log($scope.creativity.items);
                }
                $scope.onSourceType = function(url) {
                    if ($scope.validateUrl(url)) {
                        $scope.sourceError = '';
                        $scope.sourceFetchLoading = true;
                        addItemService.iframely(url, "sourceCodeUrl");
                    } else {
                        $scope.sourceError = 'Invalid url!'
                    }
                    console.log($scope.creativity.items);
                }

                $scope.removeScreenshot = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'url') {
                        $scope.imageAdded = false;
                        $scope.drawingAdded = false; // On adding images this variable is set true in add drawing directive so we have to set it false here !
                        $scope.UiUxAdded = false; // On adding images this variable is set true in add uiux directive so we have to set it false here !
                        $scope.checkPublishableWebsite();
                    }
                }

            }
        };
    });

})();
