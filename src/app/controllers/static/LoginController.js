'use strict';
(function() {

    angular
        .module('app')
        .controller('LoginController', [
            '$scope', 'loginData', '$rootScope', '$localStorage', '$state', '$auth', 'tokenService',
            LoginController
        ]);

    function LoginController($scope, loginData, $rootScope, $localStorage, $state, $auth, tokenService) {
        var vm = this;
        console.log(localStorage.getItem('id_token'));
        

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(response) {
                    response.type = "facebook";

                    console.log(response);

                    tokenService.post("login", response)
                        .then(function(abc) {
                            localStorage.setItem('id_token', abc.token);
                            $rootScope.token=abc.token;
                            $state.go("home.dashboard");


                        }).catch(function(abc) {
                            console.log(abc);
                            // Something went wrong.
                        });
                })
                .catch(function(response) {
                    console.log(response);
                    // Something went wrong.
                });
        };

        $scope.login = {};
        $rootScope.$on('event:social-sign-in-success', function(event, response) {
            console.log(response);
            $scope.login = response;
            $scope.login.type = response.provider;
            console.log($scope.login);

            tokenService.post("login", $scope.login)
                .then(function(abc) {
                    console.log(abc);
                    localStorage.setItem('id_token', abc.token);
                    $rootScope.token=abc.token;
                    $state.go("home.dashboard");


                }).catch(function(abc) {

                });
        })

        vm.tableData = [];


    }

})();
