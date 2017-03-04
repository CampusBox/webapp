(function() {

    angular
        .module('app')
        .controller('LoginController', [
            '$scope', 'loginData', '$rootScope', '$localStorage', '$state', '$auth', 'tokenService',
            LoginController
        ]);

    function LoginController($scope, loginData, $rootScope, $localStorage, $state, $auth, tokenService) {
        var vm = this;
        console.log('1');

        // tokenService.post("token")
        //     .then(function(response) {
        //         console.log(response);
        //         localStorage.setItem('id_token', response.token);
        //         console.log(localStorage.getItem('id_token'));

        //         tokenService.get("events").then(function(abc) {
        //             console.log(abc);
        //         });


        //     }).catch(function(response) {
        //         console.log(response);
        //         // Something went wrong.
        //     });


        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(response) {
                    // Signed in with Google.


                    console.log(response);

                    tokenService.post("facebook", response)
                        .then(function(abc) {
                            console.log(abc);
                            localStorage.setItem('id_token', abc.token);
                            console.log(localStorage.getItem('id_token'));

                            tokenService.get("events").then(function(abc) {
                                console.log(abc);
                            });


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
        $scope.doLogin = function(customer) {
            console.log('attempt');
            $scope.showLoading = true;
            // $location.path('/dashboard');

            loginData.post('login', {
                customer: customer
            }).then(function(results) {


                console.log(results);
                if (results.status == "success") {
                    $localStorage.user = angular.copy(results);
                    $localStorage.authenticated = true;

                    // $rootScope.$loginData.method = 0; //brinjal own sign up
                    console.log($rootScope.$loginData);
                    event.preventDefault();
                    $state.go('home.dashboard');
                    return;
                } else {
                    $scope.showLoading = false;
                    alert('Nope, not your credentials!');

                    //toastr.danger('Sorry, your credentials are invalid. Please check again.');
                }
            });
        };
        vm.tableData = [];


    }

})();
