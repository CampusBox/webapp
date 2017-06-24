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
                $scope.allowedWebsite = [17, 18, 19];
                $scope.url = '';
                $scope.fetchLoading = false;
                $scope.imageAdded = false;
                $scope.urlAdded = false;
                $scope.websiteAdded = false;

                //End Defining variables

                // $rootScope.$on("textAdded", function(event, state) {
                //     if ($scope.urlAdded && $scope.imageAdded) {
                //         $scope.checkPublishableWebsite();
                //     }
                // });

                $scope.checkPublishableWebsite = function() {
                    console.log('img ' + $scope.imageAdded);
                    $scope.websiteAdded = $scope.urlAdded && $scope.imageAdded;
                }
                $rootScope.$on("ImagesAdded", function(event) {
                    $scope.imageAdded = true;
                    $scope.checkPublishableWebsite();
                });
                $scope.onType = function(url) {
                    if ($scope.validateUrl(url)) {
                        $scope.urlAdded = true;
                        $scope.checkPublishableWebsite();
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
                                    $scope.imageAdded = true;
                                    var length = $scope.creativity.items.length;
                                    var media = {};
                                    media.mediaType = 'image';
                                    media.image = data.image;
                                    $scope.creativity.items.push(media);
                                    $scope.checkPublishableWebsite();
                                }
                                if ($scope.title == '') {
                                    $scope.title = data.title;
                                }
                                console.log($scope.creativity.items);
                            });
                    } else {
                        $scope.urlAdded = false;
                        $scope.checkPublishableWebsite();
                        $scope.error = 'Invalid url!'
                    }
                }

                $scope.removeScreenshot = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length == 1 || $scope.creativity.items[1].mediaType == 'url') {
                        $scope.imageAdded = false;
                        $scope.checkPublishableWebsite();
                    }
                }

            }
        };
    });

})();
