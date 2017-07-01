(function() {
    'use strict';

    angular.module('app').
    directive('addWebsite', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addWebsite.html',
            controller: function($scope, addItemService, $sce, allDataService, $rootScope, Upload) {
                //Define Variables
                $scope.url = '';
                $scope.fetchLoading = false;
                $scope.imageAdded = false;
                $scope.urlAdded = false;
                $scope.websiteAdded = false;
                $scope.iconCompulsary = [19];
                $scope.iconAdded = false;
                if ($scope.creativity.type == 19) {
                    $scope.iconReq = true;
                } else {
                    $scope.iconReq = false;
                }
                //End Defining variables

                $scope.checkPublishableWebsite = function() {
                    if ($scope.iconReq) {
                        $scope.websiteAdded = $scope.urlAdded && $scope.imageAdded && $scope.iconAdded;
                    } else {
                        $scope.websiteAdded = $scope.urlAdded && $scope.imageAdded;
                    }
                    $scope.$emit("publishable", $scope.websiteAdded);
                }
                $rootScope.$on("ImagesAdded", function(event) {
                    $scope.imageAdded = true;
                    $scope.checkPublishableWebsite();
                });
                $scope.uploadIcon = function(files, abc, type) {
                    $scope.iconAdded = true;
                    $scope.checkPublishableWebsite();
                    $scope.files = files;
                    if (files && files.length) {
                        $scope.progress = 2;
                        angular.forEach(files, function(file) {
                            Upload.dataUrl(file, true).then(function(url) {
                                $scope.creativity.items[1].icon = url;

                            });
                        });
                    }
                };
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
                            }).catch(function(err) {
                                addItemService.iframely(url, "tech")
                                    .then(function(response) {
                                        $scope.fetchLoading = false;
                                    }).catch(function(err) {
                                        $scope.error = err.message;
                                    });
                            });
                    } else {
                        $scope.fetchLoading = false;
                        $scope.urlAdded = false;
                        $scope.checkPublishableWebsite();
                        $scope.error = 'Invalid url!';
                    }
                    console.log($scope.creativity.items);
                }
                $scope.onSourceType = function(url) {
                    if ($scope.validateUrl(url)) {
                        $scope.sourceError = '';
                        $scope.sourceFetchLoading = true;
                        addItemService.iframely(url, "sourceCodeUrl")
                            .then(function(response) {
                                $scope.sourceFetchLoading = false;
                            }).catch(function(err) {
                                addItemService.iframely(url, "sourceCodeUrl")
                                    .then(function(response) {
                                        $scope.sourceFetchLoading = false;
                                    }).catch(function(err) {
                                        $scope.sourceError = err.message;                
                                    });
                            });
                    } else {
                        $scope.sourceError = 'Invalid url!'
                    }
                    console.log($scope.creativity.items);
                }

                $scope.removeScreenshot = function(index) {
                    console.log($scope.creativity);
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'tech') {
                        $scope.imageAdded = false;
                        $scope.checkPublishableWebsite();
                    }
                }

            }
        };
    });

})();
