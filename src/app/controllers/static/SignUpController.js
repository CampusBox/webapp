(function() {

    angular
        .module('app')
        .controller('SignUpController', [

            '$scope', '$timeout', 'loginData', '$rootScope', '$localStorage', '$state', 'collegesListService', 'tokenService', '$auth',
            SignUpController
        ]);

    function SignUpController($scope, $timeout, loginData, $rootScope, $localStorage, $state, collegesListService, tokenService, $auth) {
        var vm = this;
        $scope.loading = false;
        $scope.querySearch = querySearch;
        $scope.signUp = {};
        vm.tags = [];
        if (localStorage.getItem('id_token') != null) {
            $state.go("home.dashboard");
        }
        $scope.skills = loadSkills();
        $scope.signUp.collegeId = 0;
        tokenService.get("colleges").then(function(colleges) {
            $scope.colleges = colleges.data;
        });
                $scope.items = [];
                $scope.itemsMobile = [];

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
            { 'title': 'Singing', 'id': 9 },
            { 'title': 'Instrumental', 'id': 10 },
            { 'title': 'Music Mixing', 'id': 11 },
            { 'title': 'Photography', 'id': 12 }

        ];
        $scope.items[3] = [
            { 'title': 'Film and Video', 'id': 13 },
            { 'title': 'Animation', 'id': 14 },
            { 'title': 'Graphics', 'id': 15 },
            { 'title': 'UI and UX', 'id': 16 },
            { 'title': 'Webites', 'id': 17 }
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
            { 'title': 'Music Mixing', 'id': 11 },
            { 'title': 'Photography', 'id': 12 },
            { 'title': 'Film and Video', 'id': 13 }
        ];
        $scope.itemsMobile[4] = [
            { 'title': 'Animation', 'id': 14 },
            { 'title': 'Graphics', 'id': 15 },
            { 'title': 'UI and UX', 'id': 16 }
        ];
        $scope.itemsMobile[5] = [
            { 'title': 'Webites', 'id': 17 },
            { 'title': 'Programming', 'id': 18 },
            { 'title': 'Apps', 'id': 19 },
            { 'title': 'Electronics', 'id': 20 },
            { 'title': 'DIY', 'id': 21 }
        ];
        // $scope.sports = [
        //     { 'title': 'Football', 'intrested': false },
        //     { 'title': 'Cricket', 'intrested': false },
        //     { 'title': 'Basketball', 'intrested': false },
        //     { 'title': 'Volleyball', 'intrested': false },
        //     { 'title': 'Badminton', 'intrested': false },

        //     { 'title': 'Chess', 'intrested': false }
        // ];
        // $scope.cultural = [
        //     { 'title': 'Dancing', 'intrested': false },
        //     { 'title': 'Acting', 'intrested': false },
        //     { 'title': 'Debating', 'intrested': false },
        //     { 'title': 'Film Making', 'intrested': false },

        //     { 'title': 'Music', 'intrested': false },
        //     { 'title': 'Photography', 'intrested': false }
        // ];
        $scope.transformChip = transformChip;

        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }
            // Otherwise, create a new one
            return { name: chip }
        }

        function querySearch(query) {
            console.log('query funciton called');
            var results = query ? $scope.skills.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(skill) {
                return (skill._lowername.indexOf(lowercaseQuery) === 0);
                // (skill._lowertype.indexOf(lowercaseQuery) === 0);
            };

        }

        $scope.selectedSkills = [{
            'name': 'Broccoli'
        }, {
            'name': 'Cabbage'
        }];

        function loadSkills() {
            var skills = [{
                'name': 'Broccoli'
            }, {
                'name': 'Cabbage'
            }, {
                'name': 'Carrot'
            }, {
                'name': 'Lettuce'
            }, {
                'name': 'Spinach'
            }];

            return skills.map(function(veg) {
                veg._lowername = veg.name.toLowerCase();
                return veg;
            });
        };


        $scope.signUp = {};

        $scope.authenticate = function(provider) {
            $scope.loading = true;
            $auth.authenticate(provider).then(function(response) {
                    $scope.signUp.token = response.access_token;
                    $scope.signUp.type = provider;
                    $scope.signUp.skills = $scope.selectedSkills;
                    $scope.signUp.intrests = $scope.interests;
                    $scope.signUp.college_id = 1;
                    console.log("then");
                    tokenService.post("signup", $scope.signUp)
                        .then(function(abc) {
                            console.log(abc);
                            localStorage.setItem('id_token', abc.token);
  //                          localStorage.setItem('username', abc.student.username);
    //                        localStorage.setItem('college_id', abc.student.college_id);
      //                      localStorage.setItem('image', abc.student.image);
                            $rootScope.token = abc.token;
                            $rootScope.image = abc.image;
                            $state.go("home.dashboard");
                            return;
                        }).catch(function(abc) {
                            console.log(abc);
                            localStorage.setItem('id_token', abc.token);
                            $scope.problem=abc.status;
                            $rootScope.token = abc.token;
                             $state.go("home.dashboard");
                            return;

                        });

                })
                .catch(function(response) {
                    console.log("catch");

                    $scope.signUp.token = response.access_token;
                    $scope.signUp.type = provider;
                    $scope.signUp.skills = $scope.selectedSkills;
                    $scope.signUp.intrests = $scope.interests;
                    $scope.signUp.college_id = $scope.college;
                    $scope.signUp.college_id = 1;
                    tokenService.post("signup", $scope.signUp)
                        .then(function(abc) {
                            localStorage.setItem('id_token', abc.token);
                            $rootScope.token = abc.token;
                            //                            $state.go("home.dashboard");
                            return;
                        }).catch(function(abc) {
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

            console.log(event);
            console.log(response);
            $scope.signUp.token = response.token;
            $scope.signUp.type = "google";
            $scope.signUp.skills = $scope.selectedSkills;
            $scope.signUp.intrests = $scope.interests;
            $scope.signUp.college_id = $scope.college;
            $scope.signUp.college_id = 1;

            console.log($scope.signUp);
            tokenService.post("signup", $scope.signUp)
                .then(function(abc) {
                    console.log(abc);
                    localStorage.setItem('id_token', abc.token);
                    $rootScope.token = abc.token;
                    //      $state.go("home.dashboard");
                    return;

                }).catch(function(abc) {
                                $scope.loading = false;
                                $scope.problem="Could not sign you up try again later.";

                });

            // $scope.$apply(function() {

            //     $scope.currentState = 2;
            // })
            $timeout(function() {
                //$scope.currentState = 2;
                // $scope.someData = someData;
            }, 0);
        })


    }
})();
