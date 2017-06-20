(function() {
    'use strict';

    angular.module('app')
        .service('addItemService', [
            '$mdDialog',
            '$timeout',
            '$sce',
            '$rootScope',
            'allDataService',
            function($mdDialog, $timeout, $sce, $rootScope, allDataService) {

                var obj = {};

                obj.addError = '';
                obj.url = '';
                obj.mediaType = "";


                obj.validateSoundcloud = function(url) {
                    var regexp = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
                    return url.match(regexp) && url.match(regexp)[2]
                };
                obj.validateUrl = function(url) {
                    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                    if (res == null)
                        return false;
                    else
                        return true;
                };
                obj.submitUrl = function(url, type) {
                    obj.url = url;
                    switch (type) {
                        case 'Youtube':
                            obj.addError = '';
                            var videoid = obj.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                            if (videoid != null) {
                                obj.item = {};
                                obj.item.mediaType = "youtube";
                                obj.item.embedUrl1 = "//www.youtube.com/embed/" + videoid[1];
                                obj.item.embedUrl = videoid[1];
                                obj.item.embedUrlIframe = $sce.trustAsResourceUrl(obj.item.embedUrl1);
                            } else {
                                obj.addError = 'Invalid youtube url';
                                console.log('Invalid youtube url');
                            }
                            break;
                        case 'Soundcloud':
                            obj.addError = '';
                            if (obj.validateSoundcloud(obj.url)) {
                                obj.item = {};
                                obj.item.mediaType = "soundcloud";
                                obj.item.embedUrl = obj.url;
                                obj.item.embedUrl1 = "//w.soundcloud.com/player/?url=" + obj.url;
                                obj.item.embedUrlIframe = $sce.trustAsResourceUrl(obj.item.embedUrl1);
                                setNoembed(obj.url);

                            } else {
                                obj.addError = 'Invalid soundcloud url';
                                console.log('Invalid soundcloud url');
                                obj.mediaType = "";
                            }
                            break;
                        case 'Vimeo':
                            obj.addError = '';
                            var videoid = obj.url.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                            if (videoid != null) {
                                obj.item = {};
                                obj.item.mediaType = "vimeo";
                                obj.item.embedUrl = "//player.vimeo.com/video/" + videoid[3] + '?color=ffffff&title=0&byline=0&portrait=0&badge=0';
                                obj.item.embedUrlIframe = $sce.trustAsResourceUrl(obj.item.embedUrl);
                                setNoembed(obj.url);
                            } else {
                                obj.addError = 'Invalid vimeo url';
                                console.log("Invalid vimeo url");
                                obj.mediaType = "";
                            }
                            break;
                        case 'Link':
                            obj.addError = '';
                            if (obj.validateUrl(obj.url)) {
                                obj.item.mediaType = 'link';
                                allDataService.get(obj.url)
                                    .then(function(blogs) {
                                        obj.item.embedUrl = blogs.data;
                                    });
                            } else {
                                obj.addError = 'Please enter a valid url';
                            }
                            break;
                        default:
                    }
                    $rootScope.$emit("returnedItem", obj.item, obj.addError);

                }
                return obj;
            }
        ]);
})();
