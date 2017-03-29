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
        $scope.loading = false;
        if (localStorage.getItem('id_token') != null) {
            $state.go("home.dashboard");
        }

        $scope.authenticate = function(provider) {
            $scope.loading = true;
            $auth.authenticate(provider).then(function(response) {
                    response.type = "facebook";

                    console.log(response);

                    tokenService.post("login", response)
                        .then(function(abc) {
                            if(abc.registered==false){
                            $state.go("static.signup");
                                
                            }
                            localStorage.setItem('id_token', abc.token);
                            $rootScope.token = abc.token;

                            $state.go("home.dashboard");


                        }).catch(function(abc) {
                            console.log(abc);
                            if(abc.registered==false){
                            $state.go("static.signup");
                                
                            }
                            $scope.problem = abc.status;
                            $scope.loading = false;
                        });
                })
                .catch(function(response) {
                    console.log(response);
                    $scope.loading = false;
                    // Something went wrong.
                });
        };

        $scope.login = {};
        $rootScope.$on('event:social-sign-in-success', function(event, response) {
            $scope.loading = true;
            console.log(response);
            $scope.login = response;
            $scope.login.type = response.provider;
            console.log($scope.login);

            tokenService.post("login", $scope.login)
                .then(function(abc) {
                    if(abc.registered==false){
                            $state.go("static.signup");
                                
                            }
                    console.log(abc);
                    localStorage.setItem('id_token', abc.token);
                    $rootScope.token = abc.token;
                    $state.go("home.dashboard");


                }).catch(function(abc) {
                    if(abc.registered==false){
                            $state.go("static.signup");
                                
                            }
                    console.log(response);
                    $scope.loading = false;
                            $state.go("static.signup");
                    
                });
        })

        vm.tableData = [];


    }

})();
