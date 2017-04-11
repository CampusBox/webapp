(function() {

        angular
            .module('app')
            // .service('placeAutocomplete', function() { /* ... */ })
            .controller('AddItemController', [
                '$mdDialog',
                '$scope',
                'Upload',
                '$timeout',
                'title',
                '$sce',
                AddItemController
            ]);

        function AddItemController($mdDialog, $scope, Upload, $timeout, title, $sce) {
            $scope.error = '';
            $scope.url = '';
            $scope.mediaType = "";
            $scope.title = title;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.validateSoundcloud = function(url) {
                var regexp = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
                return url.match(regexp) && url.match(regexp)[2]
            };
            $scope.validateUrl = function(url) {
                var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                if (res == null)
                    return false;
                else
                    return true;
            };
        $scope.submitUrl = function(url) {
            $scope.url = url;
            console.log($scope.url)
            switch (title) {
                case 'Youtube':
                    $scope.error = '';
                    $scope.item = {};
                    var videoid = $scope.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                    if (videoid != null) {
                        $scope.item.mediaType = "youtube";
                        $scope.item.embedUrl1 = "//www.youtube.com/embed/" + videoid[1];
                        $scope.item.embedUrl =videoid[1];
                        $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl1);
                        $mdDialog.hide($scope.item);
                    } else {
                        $scope.error = 'Invalid youtube url';
                        console.log('Invalid youtube url');
                    }
                    break;
                case 'Soundcloud':
                    $scope.error = '';
                    $scope.item = {};
                    if ($scope.validateSoundcloud($scope.url)) {
                        $scope.item.mediaType = "soundcloud";
                        $scope.item.embedUrl =  $scope.url;
                        $scope.item.embedUrl1 = "//w.soundcloud.com/player/?url=" + $scope.url;
                        $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl1);

                        $mdDialog.hide($scope.item);
                    } else {
                        $scope.error = 'Invalid soundcloud url';
                        console.log('Invalid soundcloud url');
                        $scope.mediaType = "";
                    }
                    break;
                case 'Vimeo':
                    $scope.error = '';
                    var videoid = $scope.url.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                    if (videoid != null) {
                        $scope.item = {};
                        $scope.item.mediaType = "vimeo";
                        $scope.item.embedUrl = "//player.vimeo.com/video/" + videoid[3] + '?color=ffffff&title=0&byline=0&portrait=0&badge=0';
                        $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl);
                        $mdDialog.hide($scope.item);
                    } else {
                        $scope.error = 'Invalid vimeo url';
                        console.log("Invalid vimeo url");
                        $scope.mediaType = "";
                    }
                    break;
                case 'Link':
                    $scope.error = '';
                    if ($scope.validateUrl($scope.url)) {
                        var item = {};
                        item.mediaType = 'link';
                        allDataService.get($scope.url)
                            .then(function(blogs) {
                                item.embedUrl = blogs.data;
                            });
                        $mdDialog.hide(item);
                    } else {
                        $scope.error = 'Please enter a valid url';
                    }
                    break;
                default:
            }
        }
    }

})();
