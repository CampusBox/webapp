(function() {
    'use strict';

    angular.module('app')
        .service('allDataService', [
            '$http',
            '$q',
            function($http, $q, $location, $scope) {

                var serviceBase = 'http://api.linkpreview.net/?key=58c3b113acaa86a9edcb7b63821802aa44d35d531c9fc&dataType=jsonp&q=';

                var obj = {};

                // $scope.config = function() {
                //     return {
                //         dataType: 'jsonp'
                //     };
                // };
                obj.get = function(q) {
                    return $http.get(serviceBase + q).then(function(results) {
                        return results.data;
                    });
                };
                obj.post = function(q, object) {
                    return $http.post(serviceBase + q, object).then(function(results) {
                        return results.data;
                    });
                };
                obj.put = function(q, object) {
                    return $http.put(serviceBase + q, object).then(function(results) {
                        return results.data;
                    });
                };
                obj.delete = function(q) {
                    return $http.delete(serviceBase + q).then(function(results) {
                        return results.data;
                    });
                };
                return obj;
            }
        ]);
})();
