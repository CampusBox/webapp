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
                //End Defining variables

                $rootScope.$on("ImagesAdded", function(event) {
                    $scope.publishable = true;
                });
                $scope.onType = function(url) {
                    console.log(url);
                    if ($scope.validateUrl(url)) {
                        $scope.fetchLoading = true;
                        var media = {};
                        media.mediaType = 'url';
                        media.url = url;
                        $scope.creativity.items.push(media);
                        allDataService.linkPreviewJson(url)
                            .then(function(data) {
                    $scope.fetchLoading = false;
                                if (data.image != '') {
                                    var length = $scope.creativity.items.length;
                                    var media = {};
                                    media.mediaType = 'image';
                                    media.image = data.image;
                                    $scope.creativity.items.push(media);
                                }
                                if ($scope.title == '') {
                                    $scope.title = data.title;
                                }
                                console.log($scope.creativity.items);
                            });
                    } else {
                        $scope.error = 'Invalid url!'
                    }
                }

                $scope.removeItem = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    if ($scope.creativity.items.length < 2) {
                        $scope.publishable = false;
                    }
                    $scope.musicAdded = false;
                }

            }
        };
    });

})();
