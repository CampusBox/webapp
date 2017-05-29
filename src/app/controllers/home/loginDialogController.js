'use strict';
(function() {

    angular
        .module('app')
        .controller('loginDialogController', [
            '$scope', 'loginData', '$rootScope', '$localStorage', '$state', '$auth', 'tokenService','$mdDialog',
            loginDialogController
        ]);

    function loginDialogController($scope, loginData, $rootScope, $localStorage, $state, $auth, tokenService, $mdDialog) {
        var vm = this;
        $scope.loading = false;
        if (localStorage.getItem('id_token') != null) {
            // $state.go("home.dashboard");
            $mdDialog.hide();
        }

        $scope.authenticate = function(provider) {
            $scope.loading = true;
            $auth.authenticate(provider).then(function(response) {
                    response.type = "facebook";

                    console.log(response);
                    console.log(response.access_token);

                    tokenService.post("login", response)
                        .then(function(abc) {
                            if (abc.registered == false) {
                                $state.go("static.signUp");

                            }
                            localStorage.setItem('id_token', abc.token);
                            $rootScope.token = abc.token;
                            $rootScope.authenticated = true;

                            // $state.go("home.dashboard");
                            $mdDialog.hide();


                        }).catch(function(abc) {
                            console.log(abc);
                            if (abc.registered == false) {
                                $state.go("static.signUp");

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
                    if (abc.registered == false) {
                        console.log(abc);
                        $state.go("static.signUp");

                    } else {

                        console.log(abc);
                        localStorage.setItem('id_token', abc.token);
                        $rootScope.token = abc.token;
                        $rootScope.authenticated = true;
                        // $state.go("home.dashboard");
                        $mdDialog.hide();
                    }


                }).catch(function(abc) {
                    if (abc.registered == false) {
                        $state.go("static.signUp");

                    } else {

                        console.log(response);
                        $scope.loading = false;
                        $state.go("static.signUp");
                    }

                });
        })

        vm.tableData = [];


    }

})();
