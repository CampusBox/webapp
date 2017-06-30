(function() {
    'use strict';

    angular.module('app')
        .service('addItemService', [
            '$mdDialog',
            '$timeout',
            '$sce',
            '$q',
            '$rootScope',
            'allDataService',
            function($mdDialog, $timeout, $sce, $rootScope, allDataService) {
            function($mdDialog, $timeout, $sce, $q,$rootScope, allDataService) {

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
                obj.youtube = function(url) {
                    obj.url = url;
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
                    $rootScope.$emit("returnedItem", obj.item, obj.addError);

                }

                obj.iframely = function(url, type) {
                    var defer = $q.defer();
                    obj.url = url;
                    obj.addError = '';
                    allDataService.iframelyJson(url).then(function(data) {
                        console.log(data);
                        defer.resolve({err: false});
                        obj.item = {};
                        // obj.item.display = {};
                        // obj.item.display.title = data.meta.title;
                        obj.item.mediaType = type;
                        // obj.item.embed = [];
                        
                        if (data.html) {
                            obj.item.iframe = data.html;
                        }
                        obj.item.url = url;
                        if (data.meta.site != undefined) {
                            obj.item.provider = data.meta.site;
                        }
                        if (data.links.thumbnail != undefined) {
                            obj.item.thumbnailUrl = data.links.thumbnail[0].href;
                        }
                        if (data.links.icon != undefined) {
                            obj.item.icon = data.links.icon[0].href;
                        }
                        if (data.meta.author_url != undefined) {
                            obj.item.author = data.meta.author_url;
                        } else if (data.meta.author != undefined) {
                            obj.item.author = data.meta.author;
                        }
                        obj.item.embedIframe = $sce.trustAsHtml(data.html);
                        $rootScope.$emit("returnedItem", obj.item, 0);
                    }).catch(function(err) {
                        defer.reject({err: true,message: 'Url not found'});
                        obj.addError = 'Url not found';
                        console.log(err);
                        $rootScope.$emit("returnedItem", obj.addError, 1);

                    });

                    $timeout(function() {
                            console.log(obj.item);
                        if (obj.item != undefined) {
                            return {
                                data: obj.item,
                                error: obj.addError
                            };
                        }
                    }, 1000);

                    return defer.promise;
                }
                obj.soundcloud = function(url) {
                    obj.url = url;
                    obj.addError = '';
                    if (obj.validateSoundcloud(obj.url)) {
                        obj.item = {};
                        obj.item.mediaType = "soundcloud";
                        obj.item.embedUrl = obj.url;
                        obj.item.embedUrl1 = "//w.soundcloud.com/player/?url=" + obj.url;
                        obj.item.embedUrlIframe = $sce.trustAsResourceUrl(obj.item.embedUrl1);

                    } else {
                        obj.addError = 'Invalid soundcloud url';
                        console.log('Invalid soundcloud url');
                        obj.mediaType = "";
                    }
                    $rootScope.$emit("returnedItem", obj.item, obj.addError);
                }
                obj.vimeo = function(url) {
                    obj.url = url;
                    obj.addError = '';
                    var videoid = obj.url.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                    if (videoid != null) {
                        obj.item = {};
                        obj.item.mediaType = "vimeo";
                        obj.item.embedUrl = "//player.vimeo.com/video/" + videoid[3] + '?color=ffffff&title=0&byline=0&portrait=0&badge=0';
                        obj.item.embedUrlIframe = $sce.trustAsResourceUrl(obj.item.embedUrl);
                    } else {
                        obj.addError = 'Invalid vimeo url';
                        console.log("Invalid vimeo url");
                        obj.mediaType = "";
                    }
                    $rootScope.$emit("returnedItem", obj.item, obj.addError);
                }

                return obj;
            }
        ]);
})();
