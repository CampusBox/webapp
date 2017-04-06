(function() {
    'use strict';

    angular.module('app')
        .service('tokenService', [
            '$rootScope',
            '$http',
            '$q',
            function($rootScope, $http, $q, $location) {
                // console.log($rootScope.token);
                // var serviceBase = '/api/public/';
                var serviceBase = '/api/public/';
                $rootScope.config = function() {
                    return {
                        headers: {
                            'Authorization': 'Bearer ' + $rootScope.token,
                        }
                    };
                };
                var obj = {};

                obj.get = function(q) {
                    return $http.get(serviceBase + q, $rootScope.config()).then(function(results) {
                        return results.data;
                    });
                };
                obj.post = function(q, object) {
                    return $http.post(serviceBase + q, object, $rootScope.config()).then(function(results) {
                        return results.data;
                    });
                };
                obj.put = function(q, object) {
                    return $http.put(serviceBase + q, object, $rootScope.config()).then(function(results) {
                        return results.data;
                    });
                };
                obj.delete = function(q) {
                    return $http.delete(serviceBase + q, $rootScope.config()).then(function(results) {
                        return results.data;
                    });
                };
                return obj;
            }
        ]);
})();
