(function() {
    'use strict';

    angular.module('app')
        .service('allDataService', [
            '$http',
            '$q',
            '$location',
            '$sce',
            function($http, $q, $location, $sce) {

                var linkPreview = 'http://api.linkpreview.net/?key=594e13bd3287bc236d2a390e3ded18e720fbd684e1415&dataType=jsonp&q=';
                var noembed = 'https://noembed.com/embed?url=';
                var iframely = 'http://139.59.56.166/iframely?url=';

                var obj = {};

                obj.noembedJson = function(q) {
                    return $http.get(noembed + q).then(function(results) {
                        return results.data;
                    });
                };
                obj.linkPreviewJson = function(q) {
                    var url = linkPreview + q;
                    var trustedUrl = $sce.trustAsResourceUrl(url);
                    return $http.jsonp(trustedUrl).then(function(results) {
                        return results.data;
                    });
                };
                obj.iframelyJson = function(q) {
                    var url = iframely + q;
                    var trustedUrl = $sce.trustAsResourceUrl(url);
                    return $http.jsonp(trustedUrl).then(function(results) {
                        return results.data;
                    });
                    
                };


                return obj;
            }
        ]);
})();
