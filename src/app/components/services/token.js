(function() {
    'use strict';

    angular.module('app')
        .service('tokenService', [
            '$rootScope',
            '$http',
            '$q',
            function($rootScope, $http, $q, $location) {
                
              
                // Uncomment as per usage
                // 
                // before building to pushing to Beta Server 
                // var serviceBase = '/dist/api/public/';
                // 
                // before building to pushing to Main Server 
                // var serviceBase = 'api/public/';
                // 
                // 
                // To test locally from main API 
                 var serviceBase = 'https://campusbox.org/dist/api/public/';
                // 
                // USE THIS AT MOST TIMES
                // 
                // To test locally from BETA API 
                 // var serviceBase = 'http://beta.campusbox.org/dist/api/public/';

                 //For testing from ayush locally
                 // var serviceBase = 'http://192.178.7.141/public/';


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
                obj.patch = function(q, object) {
                    return $http.patch(serviceBase + q, object, $rootScope.config()).then(function(results) {
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
