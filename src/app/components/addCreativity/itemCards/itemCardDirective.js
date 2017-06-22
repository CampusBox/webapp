(function() {
    'use strict';

    angular.module('app').
    directive('itemCard', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/addCreativity/itemCards/itemCard.html',
            controller: function($scope, addItemService, allDataService) {
                $scope.isAllowed = function(allowed, id) {
                    return allowed.indexOf(id) !== -1;
                }
                $scope.validateYoutube = function(url) {
                    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    if (videoid != null) {
                        return true;
                    } else {
                        return false;
                    }
                }
                $scope.validateVimeo = function(url) {
                    var videoid = url.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                    if (videoid != null) {
                        return true;
                    } else {
                        return false;
                    }
                }
                $scope.validateSoundcloud = function(url) {
                    var regexp = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
                    return url.match(regexp) && url.match(regexp)[2];
                };
                $scope.setNoembed = function(url) {
                    allDataService.noembedJson(url)
                        .then(function(data) {
                            $scope.creativity.items[1].noembed = data;
                            if ($scope.title == '') {
                                $scope.title = $scope.creativity.items[1].noembed.title;
                            }
                        });
                };
            }
        };
    });

})();
