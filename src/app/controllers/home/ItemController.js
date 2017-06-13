(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('ItemAddController', [
            '$mdDialog',
            '$scope',
            'participants',
            ItemAddController
        ]);

    function ItemAddController($mdDialog, $scope, participants) {

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.add = function(add) {
            $mdDialog.hide(add);
        };

        $scope.submitVideo = function() {
            var videoid = $scope.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            $scope.mediaType = "";
            if (videoid != null) {
                $scope.mediaType = "youtube";
                $scope.embedUrl = "//www.youtube.com/embed/" + videoid[1];
                $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                console.log($scope.embedUrl);
            } else {
                console.log("This is not a youtube link, checking for vimeo");
                var videoid = $scope.url.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                if (videoid != null) {
                    $scope.mediaType = "vimeo";
                    $scope.embedUrl = "//player.vimeo.com/video/" + videoid[3];
                    console.log($scope.embedUrl);
                    $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                } else {
                    console.log("neither youtube nor vimeo detected");
                    $scope.mediaType = "";
                }
            }
        };
        $scope.submitSoundcloud = function() {
            $scope.mediaType = "";
            if ($scope.getSoundCloudInfo($scope.url)) {
                $scope.mediaType = "soundcloud";
                $scope.embedUrl = "//w.soundcloud.com/player/?url=" + $scope.url;
                $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                var widgetIframe = document.getElementById('sc-widget'),
                    widget = SC.Widget(widgetIframe),
                    newSoundUrl = $scope.embedUrl;
                widget.bind(SC.Widget.Events.READY, function() {
                    // load new widget
                    widget.bind(SC.Widget.Events.FINISH, function() {
                        widget.load(newSoundUrl, {
                            show_artwork: false
                        });
                    });
                });
            } else {
                console.log('Invalid soundcloud url');
                $scope.mediaType = "";
            }
        };
      
        $scope.publish = function() {
            $scope.content.mediaType = $scope.mediaType;
            $scope.content.embedUrl = $scope.embedUrl;
            $scope.content.tags = $scope.tags;
            $scope.content.title = $scope.title;
            $scope.content.body = $scope.body;
            console.log($scope.content);

        };
    }



})();
