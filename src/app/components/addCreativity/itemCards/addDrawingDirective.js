(function() {
    'use strict';

    angular.module('app').
    directive('addDrawing', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addDrawing.html',
            controller: function($scope, addItemService, $sce, allDataService, $rootScope) {
                //Define Variables
                $scope.allowedDrawing = [4, 5, 6, 7, 12];
                $scope.inputActive = false;
                $scope.enterUrl = true;
                //End Defining variables

                $rootScope.$on("ImagesAdded", function(event) {
                    $scope.publishable = true;
                });
                $scope.activateInput = function() {
                    if ($scope.inputActive) {
                        $scope.inputActive = false;
                    } else {
                        $scope.inputActive = true;

                    }
                }

                $scope.addInstagram = function(url) {
                    // var url = 'https://www.instagram.com/p/BVpn4AfHqXJ/?r=wa1';
                    if ($scope.validateInstagram(url)) {
                        $scope.activateInput();
                        url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
                        url = 'https://' + url;
                        allDataService.noembedJson(url)
                            .then(function(data) {
                                var length = $scope.creativity.items.length;
                                var media = {};
                                media.mediaType = 'image';
                                media.image = data.thumbnail_url;
                                $scope.creativity.items.push(media);
                                $scope.creativity.items[length].noembed = data;
                                if ($scope.title == '') {
                                    $scope.title = $scope.creativity.items[1].noembed.title;
                                }
                                console.log($scope.creativity.items);
                            });
                    } else {
                        $scope.error = 'Invalid Instagtam image url!'
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
