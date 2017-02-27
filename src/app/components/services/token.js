(function() {
    'use strict';

    angular.module('app')
        .service('tokenService', [
            '$http',
            '$q',
            function($http, $q, $location) {

                var serviceBase = 'http://192.171.2.213/app/public/';
                console.log(localStorage.getItem('id_token'));
                var config = {headers: {
                         'Authorization': 'Bearer '+ localStorage.getItem('id_token'),
                     }
                 };
                var obj = {};

                obj.get = function(q) {
                    return $http.get(serviceBase + q,config).then(function(results) {
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
