(function() {

    angular
        .module('app')
        .controller('SignUpDialogController', [

            '$scope',
            '$timeout',
            '$rootScope',
            '$localStorage',
            '$state',
            'tokenService',
            // REQUIRED FOR CORDOVA
            // 'secretServices',
            // END
            '$auth',
            '$window',
            'creativityCategories',
            '$filter',
            '$mdDialog',
            SignUpDialogController
        ]);

    function SignUpDialogController($scope, $timeout, $rootScope, $localStorage, $state, tokenService,
        // REQUIRED FOR CORDOVA     
        // secretServices,
        // END
        $auth, $window, creativityCategories, $filter, $mdDialog) {
        var vm = this;

        $scope.signup = 1;
        $scope.message = '';
        $rootScope.$on("callShowSignUpFunc", function(event, message) {
            $scope.showSignUp();
            $scope.message = message;
        });
        $scope.showLogin = function() {
            $rootScope.$emit("callShowLoginFunc", {});
            $scope.signup = 0;
        }
        $scope.showSignUp = function() {
            $scope.signup = 1;

        }
        $scope.loading = false;
        $scope.querySearch = querySearch;
        $scope.signUp = {};
        vm.tags = [];
        if (localStorage.getItem('id_token') != null) {
            // $state.go("home.dashboard");
            $rootScope.authenticated = true;
            $mdDialog.hide();
        }
        $scope.signUp.college_id = 0;
        // tokenService.get("colleges").then(function(colleges) {
        //     $scope.colleges = colleges.data;
        // });
        $scope.items = creativityCategories.items;
        $scope.itemsMobile = creativityCategories.itemsMobile;

        $scope.searchData = $filter('filter')($scope.filteredPeople, {
            name: 'a'
        });
        //Search Autocomplete start

        $scope.querySearch = querySearch;

        function querySearch(query) {

            $scope.searchData = $filter('limitTo')($filter('filter')($scope.filteredPeople, { name: query }), 5);
        }

        // Search Autocomplete End



        $scope.signUp = {};
        $scope.selectedItemChange = function(id) {
            console.log(id);
            $scope.signUp.college = id;
            $scope.signUp.college_id = id;
        };
        $scope.authenticate = function(provider) {
            $scope.loading = true;
            $auth.authenticate(provider).then(function(response) {
                    $scope.signUp.token = response.access_token;
                    $scope.signUp.type = provider;
                    $scope.signUp.skills = $scope.selectedSkills;
                    $scope.signUp.intrests = $scope.interests;
                    tokenService.post("signup", $scope.signUp)
                        .then(function(abc) {
                            localStorage.setItem('id_token', abc.token);
                            //                          localStorage.setItem('username', abc.student.username);
                            //                        localStorage.setItem('college_id', abc.student.college_id);
                            //                      localStorage.setItem('image', abc.student.image);
                            $rootScope.token = abc.token;
                            $rootScope.image = abc.image;
                            // $state.go("home.dashboard");
                            $rootScope.authenticated = true;
                            tokenService.get("userImage")
                                .then(function(res) {
                                    $rootScope.user = res;
                                    tokenService.get("notifications")
                                        .then(function(abcd) {
                                            $rootScope.notifications = abcd;
                                            $state.go("home.creativity");
                                        });
                                });
                            $mdDialog.hide();
                        }).catch(function(abc) {
                            localStorage.setItem('id_token', abc.token);
                            $scope.problem = abc.status;
                            $rootScope.token = abc.token;
                            // $state.go("home.dashboard");
                            $rootScope.authenticated = true;
                            $mdDialog.hide();

                        });

                })
                .catch(function(response) {

                    $scope.signUp.token = response.access_token;
                    $scope.signUp.type = provider;
                    $scope.signUp.skills = $scope.selectedSkills;
                    $scope.signUp.intrests = $scope.interests;
                    $scope.signUp.college_id = $scope.college;
                    tokenService.post("signup", $scope.signUp)
                        .then(function(abc) {
                            localStorage.setItem('id_token', abc.token);
                            $rootScope.token = abc.token;
                            // $state.go("home.dashboard");
                            $rootScope.authenticated = true;
                            $mdDialog.hide();
                        })
                        .catch(function(abc) {
                            $scope.loading = false;

                        });
                });

        };

        $scope.authenticateFromCordova = function(provider) {

            $scope.loading = true;

            console.log("Signup from facebook");
            $scope.signUp = {};

            facebookConnectPlugin.login([
                "user_about_me",
                "read_custom_friendlists",
                "user_friends",
                "email",
                "user_hometown",
                "user_likes"
            ], function(response) {
                $scope.signUp = {
                    'type': 'facebook',
                    'token': response.authResponse.accessToken,
                    'expires_in': response.authResponse.expiresIn,
                    'skills': $scope.selectedSkills,
                    'intrests': $scope.interests
                };

                console.log(JSON.stringify($scope.signUp));

                tokenService.post("signup", $scope.signUp)
                    .then(function(abc) {
                        localStorage.setItem('id_token', abc.token);

                        console.log(JSON.stringify(abc));

                        $rootScope.token = abc.token;
                        $rootScope.image = abc.image;
                        $rootScope.authenticated = true;
                        tokenService.get("userImage")
                            .then(function(response) {
                                $rootScope.user = response;
                                tokenService.get("notifications")
                                    .then(function(abc) {
                                        $rootScope.notifications = abc;
                                        $state.go("home.creativity");
                                    });
                            });
                        $mdDialog.hide();
                    })
                    .catch(function(abc) {
                        localStorage.setItem('id_token', abc.token);
                        $scope.problem = abc.status;
                        $rootScope.authenticated = false;
                        $scope.showSignUp('Could not contact server. Please try again later!');
                    });

            }, function(obj) {

                $scope.signUp.token = response.access_token;
                $scope.signUp.type = provider;
                $scope.signUp.skills = $scope.selectedSkills;
                $scope.signUp.intrests = $scope.interests;
                $scope.signUp.college_id = $scope.college;
                tokenService.post("signup", $scope.signUp)
                    .then(function(abc) {
                        localStorage.setItem('id_token', abc.token);
                        $rootScope.token = abc.token;
                        // $state.go("home.dashboard");
                        $rootScope.authenticated = true;
                        $mdDialog.hide();
                    })
                    .catch(function(abc) {
                        $scope.loading = false;

                    });
            });
        };
        $scope.selected = [];
        $scope.interests = [];

        $scope.toggle = function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
                $scope.buttonClass = 'md-primary md-raised';
            }
            item.intrested = !item.intrested;
            $scope.interests = list;
            $scope.continue = ($scope.interests.length > 3);
        };
        $scope.exists = function(item, list) {
            return list.indexOf(item) > -1;
        };
        $scope.currentState = 1;

        $scope.googleSignUp = function() {

            console.log("Running googleSignIn test from signup");

            $scope.signUp = {};
            $scope.loading = true;

            if (!$window.plugins) {
                console.log("No plugin found!");
            }

            $window.plugins.googleplus.login({
                    'webClientId': '702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com',
                    'offline': true,
                },
                function(user_data) {

                    console.log(JSON.stringify(user_data));
                    console.log("I am running!");
                    $server_token = user_data.serverAuthCode;

                    $scope.signUp = {
                        'type': 'google',
                        'provider': "google",
                        'skills': $scope.selectedSkills,
                        'intrests': $scope.interests,
                        'college_id': $scope.college,
                        'name': user_data.displayName,
                        'imageUrl': user_data.imageUrl,
                        'email': user_data.email,
                        'uid': user_data.userId
                    };

                    $.post('https://accounts.google.com/o/oauth2/token', {
                        code: user_data.serverAuthCode,
                        client_id: '702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com',
                        // REQUIRED FOR CORDOVA
                        // client_secret: secretServices.getGClientSecret,
                        // END
                        grant_type: 'authorization_code',
                        redirect_uri: "",
                    }).then(function(obj) {

                        console.log("response from desi server");
                        console.log(JSON.stringify(obj));
                        $scope.signUp.token = obj.access_token;

                        console.log("starting signUp request");
                        console.log(JSON.stringify($scope.signUp));

                        tokenService.post("signup", $scope.signUp)
                            .then(function(abc) {

                                console.log("Got signup request response");
                                console.log(JSON.stringify(abc));
                                localStorage.setItem('id_token', abc.token);
                                $rootScope.token = abc.token;
                                $rootScope.authenticated = true;
                                $mdDialog.hide();
                                tokenService.get("userImage")
                                    .then(function(response) {
                                        $rootScope.user = response;
                                        tokenService.get("notifications")
                                            .then(function(notif) {
                                                $rootScope.notifications = notifs;
                                                $state.go("home.creativity");
                                            });
                                    });



                            })
                            .catch(function() {
                                $scope.loading = false;
                                $scope.problem = "Could not sign you up try again later.";
                            });

                        $window.plugins.googleplus.logout(
                            function(msg) {}
                        );
                    });
                },
                function(msg) {

                }
            );

        };

        $rootScope.$on('event:social-sign-in-success', function(event, response) {
            // console.log("Social sign in success")
            // console.log(userDetails);
            $scope.loading = true;

            $scope.signUp.token = response.token;
            $scope.signUp.type = "google";
            $scope.signUp.skills = $scope.selectedSkills;
            $scope.signUp.intrests = $scope.interests;
            $scope.signUp.college_id = $scope.college;

            tokenService.post("signup", $scope.signUp)
                .then(function(abc) {
                    localStorage.setItem('id_token', abc.token);
                    $rootScope.token = abc.token;
                    // $state.go("home.dashboard");
                    $rootScope.authenticated = true;
                    $mdDialog.hide();

                })
                .catch(function() {
                    $scope.loading = false;
                    $scope.problem = "Could not sign you up try again later.";

                });

            // $scope.$apply(function() {

            //     $scope.currentState = 2;
            // })
            $timeout(function() {
                //$scope.currentState = 2;
                // $scope.someData = someData;
            }, 0);
        });



    }
})();