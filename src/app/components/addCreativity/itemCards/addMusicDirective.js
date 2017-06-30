(function() {
    'use strict';

    angular.module('app').
    directive('addMusic', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/addMusic.html',
            controller: function($scope, addItemService, $sce) {
                //Define Variables
                $scope.musicAdded = false;
                $scope.enterUrl = true;
                //End Defining variables

                $scope.checkMusic = function() {
                    if ($scope.creativity.items[0] == undefined || $scope.musicAdded) {
                        $scope.musicAdded = false;
                        $scope.url='';
                        $scope.$emit("publishable", $scope.musicAdded);
                    } else {
                        $scope.musicAdded = true;
                        $scope.$emit("publishable", $scope.musicAdded);
                    }
                }
                $scope.removeMusic = function() {
                    $scope.creativity.items.pop();
                    $scope.musicAdded = false;
                        $scope.url='';
                    $scope.$emit("publishable", $scope.musicAdded);
                }
                $scope.addMusic = function(url) {
                    if (addItemService.validateUrl(url)) {
                        if ($scope.creativity.items.length > 1) {
                            $scope.creativity.items.pop();
                        }
                        var promise = addItemService.iframely(url, "embed");

                        promise.then(function(greeting) {
                            $scope.checkMusic();
                        }, function(err) {
                            console.log("Retrying");
                            promise.then(function(greeting) {
                                $scope.checkMusic();
                            }, function(err) {
                                $scope.error = err.message;
                            });
                        });
                    } else {
                        $scope.error = 'Enter a valid url.'
                    }
                };
            }
        };
    });

})();
