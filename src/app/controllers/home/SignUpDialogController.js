(function() {

    angular
        .module('app')
        .controller('SignUpDialogController', [

            '$scope',
            '$timeout',
            'loginData',
            '$rootScope',
            '$localStorage',
            '$state',
            'collegesListService',
            'tokenService',
            '$auth',
            '$filter',
            'todoListService',
            '$mdDialog',
            '$rootScope',
            SignUpDialogController
        ]);

    function SignUpDialogController($scope, $timeout, loginData, $rootScope, $localStorage, $state, collegesListService, tokenService, $auth, $filter, todoListService, $mdDialog, $rootScope) {
        var vm = this;
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
        $scope.items = [];
        $scope.itemsMobile = [];

        $scope.searchData = $filter('filter')($scope.filteredPeople, {
            name: 'a'
        });
        //Search Autocomplete start

        $scope.querySearch = querySearch;

        function querySearch(query) {

            $scope.searchData = $filter('limitTo')($filter('filter')($scope.filteredPeople, { name: query }), 5);
        }

        // Search Autocomplete End




        $scope.items[0] = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 }
        ];
        $scope.items[1] = [
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
            { 'title': 'Craft', 'id': 7 },
            { 'title': 'Clay', 'id': 8 }
        ];
        $scope.items[2] = [
            { 'title': 'Dancing', 'id': 22 },
            { 'title': 'Singing', 'id': 9 },
            { 'title': 'Instrumental', 'id': 10 },
            { 'title': 'Digital Music', 'id': 11 },
            { 'title': 'Photography', 'id': 12 }

        ];
        $scope.items[3] = [
            { 'title': 'Film and Video', 'id': 13 },
            { 'title': 'Animation', 'id': 14 },
            { 'title': 'Graphics', 'id': 15 },
            { 'title': 'UI and UX', 'id': 16 },
            { 'title': 'Websites', 'id': 17 }
        ];
        $scope.items[4] = [
            { 'title': 'Programming', 'id': 18 },
            { 'title': 'Apps', 'id': 19 },
            { 'title': 'Electronics', 'id': 20 },
            { 'title': 'DIY', 'id': 21 }
        ];
        $scope.itemsMobile[0] = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 }
        ];
        $scope.itemsMobile[1] = [
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
        ];
        $scope.itemsMobile[2] = [
            { 'title': 'Craft', 'id': 7 },
            { 'title': 'Clay', 'id': 8 },
            { 'title': 'Singing', 'id': 9 },
            { 'title': 'Instrumental', 'id': 10 }

        ];
        $scope.itemsMobile[3] = [
            { 'title': 'Digital Music', 'id': 11 },
            { 'title': 'Photography', 'id': 12 },
            { 'title': 'Film and Video', 'id': 13 }
        ];
        $scope.itemsMobile[4] = [
            { 'title': 'Animation', 'id': 14 },
            { 'title': 'Graphics', 'id': 15 },
            { 'title': 'UI and UX', 'id': 16 }
        ];
        $scope.itemsMobile[5] = [
            { 'title': 'Dancing', 'id': 22 },
            { 'title': 'Websites', 'id': 17 },
            { 'title': 'Programming', 'id': 18 },
            { 'title': 'Apps', 'id': 19 }

        ];
        $scope.itemsMobile[6] = [
            { 'title': 'Electronics', 'id': 20 },
            { 'title': 'DIY', 'id': 21 }
        ];




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


        todoListService
            .loadAllItems()
            .then(function(menuItems) {
                $scope.filteredPeople = [].concat(menuItems);
            });


    }
})();
