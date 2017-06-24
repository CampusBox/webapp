'use strict';
(function() {

    angular
        .module('app')
        .controller('loginDialogController', [
            '$scope',
            '$rootScope',
            '$localStorage',
            '$state',
            '$auth',
            'tokenService',
            // 'secretServices',
            '$mdDialog',
            '$window',
            loginDialogController
        ]);

    function loginDialogController($scope, $rootScope, $localStorage, $state, $auth, tokenService, $mdDialog, $window) {
        var vm = this;

        $scope.loginVar = 0;

        $rootScope.$on("callShowLoginFunc", function() {
            $scope.showLogin();
        });

        $scope.showLogin = function() {
            $scope.loginVar = 1;
        }
        $scope.showSignUp = function(message) {
            $rootScope.$emit("callShowSignUpFunc", message);
            $scope.loginVar = 0;
        }


        $scope.loading = false;
        if (localStorage.getItem('id_token') != null) {
            // $state.go("home.dashboard");
            $mdDialog.hide();
        }
        $scope.cancel = function() {
            $mdDialog.cancel();
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
                                $scope.showSignUp('You are not registered with us, please sign up to continue');
                                // $state.go("static.signUp");

                            }
                            localStorage.setItem('id_token', abc.token);
                            $rootScope.token = abc.token;
                            $rootScope.authenticated = true;

                            tokenService.get("userImage")
                                .then(function(response) {
                                    $rootScope.user = response;
                                    tokenService.get("notifications")
                                        .then(function(abc) {

                                            $rootScope.notifications = abc;
                                        });
                                });
                            // $state.go("home.dashboard");
                            $mdDialog.hide();


                        }).catch(function(abc) {
                            console.log(abc);
                            if (abc.registered == false) {
                                $scope.showSignUp('You are not registered with us, please sign up to continue');
                                // $state.go("static.signUp");

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

        $scope.authenticateFromCordova = function(provider) {
            $scope.loading = true;
            $scope.data = {};

            console.log("Login from facebook");

            facebookConnectPlugin.login([
                "user_about_me",
                "read_custom_friendlists",
                "user_friends",
                "email",
                "user_hometown",
                "user_likes"
            ], function(response) {
                $scope.data = {
                    'type': 'facebook',
                    'access_token': response.authResponse.accessToken,
                    'expires_in': response.authResponse.expiresIn
                }

                console.log(JSON.stringify($scope.data));

                tokenService.post("login", $scope.data)
                    .then(function(abc) {
                        if (abc.registered == false) {
                            $scope.showSignUp('You are not registered with us, please sign up to continue');
                            // $state.go("static.signUp");

                        }
                        localStorage.setItem('id_token', abc.token);
                        $rootScope.token = abc.token;
                        $rootScope.authenticated = true;

                        tokenService.get("userImage")
                            .then(function(response) {
                                $rootScope.user = response;
                                tokenService.get("notifications")
                                    .then(function(abc) {

                                        $rootScope.notifications = abc;
                                    });
                            });
                        // $state.go("home.dashboard");
                        $mdDialog.hide();


                    }).catch(function(abc) {
                        console.log(abc);
                        if (abc.registered == false) {
                            $scope.showSignUp('You are not registered with us, please sign up to continue');
                            // $state.go("static.signUp");

                        }
                        $scope.problem = abc.status;
                        $scope.loading = false;
                    });


            }, function(obj) {
                console.log(obj);
                $scope.loading = false;
                // Something went wrong.
            });

        };

        $scope.googleSignIn = function() {

            console.log("Running googleSignIn test");

            $scope.login = {};
            $scope.loading = true;
            $scope.login.type = "google";
            $scope.creds = {};
            $scope.creds = {
                'webClientId': '702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com',
                'offline': true,
            };

            console.log(JSON.stringify($scope.creds));

            if (!$window.plugins) {
                console.log("No plugin found!");
            }
            $window.plugins.googleplus.login($scope.creds,
                function(user_data) {
                    // For the purpose of this example I will store user data on local storage
                    // UserService.setUser({
                    //     userID: user_data.userId,
                    //     name: user_data.displayName,
                    //     email: user_data.email,
                    //     picture: user_data.imageUrl,
                    //     accessToken: user_data.accessToken,
                    //     idToken: user_data.idToken
                    // });

                    console.log(JSON.stringify(user_data));
                    console.log("I am running!");
                    $server_token = user_data.serverAuthCode;

                    $scope.login.name = user_data.displayName;
                    $scope.login.imageUrl = user_data.imageUrl;
                    $scope.login.email = user_data.email;
                    $scope.login.provider = "google";
                    $scope.login.type = "google";
                    $scope.login.uid = user_data.userId;

                    $.post('https://accounts.google.com/o/oauth2/token', {
                        code: user_data.serverAuthCode,
                        // client_id: secretServices.getGClientId,
                        // client_secret: secretServices.getGClientSecret,
                        grant_type: 'authorization_code',
                        redirect_uri: "",
                    }).then(function(obj) {
                        console.log(JSON.stringify(obj));
                        $scope.login.token = obj.access_token;

                        console.log("starting login request");
                        console.log(JSON.stringify($scope.login));

                        tokenService.post("login", $scope.login)
                            .then(function(abc) {

                                console.log("get login response from server");
                                console.log(JSON.stringify(abc));

                                if (abc.registered == false) {
                                    console.log(abc);
                                    $scope.showSignUp('You are not registered with us, please sign up to continue');
                                    // $state.go("static.signUp");

                                } else {

                                    console.log(abc);
                                    localStorage.setItem('id_token', abc.token);
                                    $rootScope.token = abc.token;
                                    $rootScope.authenticated = true;
                                    // $state.go("home.dashboard");
                                    tokenService.get("userImage")
                                        .then(function(response) {
                                            $rootScope.user = response;
                                            tokenService.get("notifications")
                                                .then(function(abc) {
                                                    $rootScope.notifications = abc;
                                                });
                                        });
                                    $mdDialog.hide();
                                }

                                $window.plugins.googleplus.logout(
                                    function(msg) {}
                                );


                            }).catch(function(abc) {
                                if (abc.registered == false) {
                                    $scope.showSignUp('You are not registered with us, please sign up to continue');
                                    // $state.go("static.signUp");

                                } else {

                                    console.log(response);
                                    $scope.loading = false;
                                    $scope.showSignUp('You are not registered with us, please sign up to continue');
                                    // $state.go("static.signUp");
                                }

                                $window.plugins.googleplus.logout(
                                    function(msg) {}
                                );

                            });

                        $state.go('app.home');
                    });

                },
                function(msg) {
                    // $ionicLoading.hide();
                    console.log(JSON.stringify(msg));
                    console.log(msg);
                }
            );
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
                        $scope.showSignUp('You are not registered with us, please sign up to continue');
                        // $state.go("static.signUp");

                    } else {

                        console.log(abc);
                        localStorage.setItem('id_token', abc.token);
                        $rootScope.token = abc.token;
                        $rootScope.authenticated = true;
                        // $state.go("home.dashboard");
                        tokenService.get("userImage")
                            .then(function(response) {
                                $rootScope.user = response;
                                tokenService.get("notifications")
                                    .then(function(abc) {
                                        $rootScope.notifications = abc;
                                    });
                            });
                        $mdDialog.hide();
                    }


                }).catch(function(abc) {
                    if (abc.registered == false) {
                        $scope.showSignUp('You are not registered with us, please sign up to continue');
                        // $state.go("static.signUp");

                    } else {

                        console.log(response);
                        $scope.loading = false;
                        $scope.showSignUp('You are not registered with us, please sign up to continue');
                        // $state.go("static.signUp");
                    }

                });
        })

        vm.tableData = [];


    }

})();
