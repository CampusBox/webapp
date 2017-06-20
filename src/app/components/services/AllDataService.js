(function() {
    'use strict';

    angular.module('app')
        .service('allDataService', [
            '$http',
            '$q',
            function($http, $q, $location, $scope) {

                // var serviceBase = 'http://api.linkpreview.net/?key=58c3b113acaa86a9edcb7b63821802aa44d35d531c9fc&dataType=jsonp&q=';
                var noembed = 'https://noembed.com/embed?url=';

                var obj = {};

                obj.noembedJson = function(q) {
                    return $http.get(noembed + q).then(function(results) {
                        return results.data;
                    });
                };
                return obj;
            }
        ]);
})();
