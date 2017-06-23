(function() {
    'use strict';

    angular.module('app').
    directive('addDrawing', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addDrawing.html',
            controller: function($scope, addItemService, $sce, allDataService) {
                //Define Variables
                $scope.allowedDrawing = [4, 5];
                $scope.musicAdded = false;
                $scope.enterUrl = true;
                //End Defining variables

                $scope.checkVideo = function() {
                    if ($scope.creativity.items[0] == undefined || $scope.musicAdded) {
                        $scope.musicAdded = false;
                    } else {
                        $scope.musicAdded = true;

                    }
                }

                $scope.instagram = function() {
                    var url = 'https://www.instagram.com/p/BVpn4AfHqXJ/?r=wa1';
                    url = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
                    url = 'https://' + url;

                    allDataService.noembedJson(url)
                        .then(function(data) {
                            var media = {};
                            media.mediaType = 'image';
                            media.image = data.thumbnail_url;
                            $scope.creativity.items.push(media);
                            $scope.creativity.items[1].noembed = data;
                            if ($scope.title == '') {
                                $scope.title = $scope.creativity.items[1].noembed.title;
                            }
                        });
                }
                $scope.removeItem = function(index) {
                    $scope.creativity.items.splice(index, 1);
                    $scope.musicAdded = false;
                }

            }
        };
    });

})();
