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
            AddItemController
        ]);

        function AddItemController($mdDialog, $scope, Upload, $timeout, title) {
            $scope.error = '';
            $scope.url = '';
            $scope.mediaType = "";
            $scope.title = title;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };0
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
                            $scope.item.embedUrl = "//www.youtube.com/embed/" + videoid[1];
                            $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl);
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
                            $scope.item.embedUrl = "//w.soundcloud.com/player/?url=" + $scope.url;
                            $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl);

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
