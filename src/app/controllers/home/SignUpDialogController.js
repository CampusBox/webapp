(function() {

    angular
        .module('app')
        .controller('SignUpDialogController', [

            '$scope',
            '$timeout',
            '$rootScope',
            '$localStorage',
            '$state',
            'collegesListService',
            'tokenService',
            '$auth',
            'creativityCategories',
            '$filter',
            'todoListService',
            '$mdDialog',
            '$rootScope',
            SignUpDialogController
        ]);

    function SignUpDialogController($scope, $timeout, $rootScope, $localStorage, $state,  tokenService, $auth,creativityCategories, $filter, $mdDialog, $rootScope) {
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
        $scope.showSignUp = function(){
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
