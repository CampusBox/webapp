(function() {

    angular
        .module('app')
        .controller('SignUpController', [

            '$scope', '$timeout', 'loginData', '$rootScope', '$localStorage', '$state', 'collegesListService', 'tokenService', '$auth',
            SignUpController
        ]);

    function SignUpController($scope, $timeout, loginData, $rootScope, $localStorage, $state, collegesListService, tokenService, $auth) {
        var vm = this;
        $scope.querySearch = querySearch;
        $scope.signUp = {};
        vm.tags = [];
        $scope.skills = loadSkills();
        $scope.roll = "";
        $scope.continue = false;
        tokenService.get("colleges").then(function(colleges) {
            $scope.colleges = colleges;
        });
        $scope.items = [
            { 'title': 'Articles','id':1, 'intrested': false },
            { 'title': 'Poetry','id':1, 'intrested': false },
            { 'title': 'Drama','id':1, 'intrested': false },
            { 'title': 'Painting','id':1, 'intrested': false },
            { 'title': 'Sketching','id':1, 'intrested': false },
            { 'title': 'Manga','id':1, 'intrested': false },
            { 'title': 'Craft','id':1, 'intrested': false },
            { 'title': 'Song Covers','id':1, 'intrested': false },
            { 'title': 'Instrumental','id':1, 'intrested': false },
            { 'title': 'Music Mixing','id':1, 'intrested': false },
            { 'title': 'Photography','id':1, 'intrested': false },

            { 'title': 'Apps','id':1, 'intrested': false },
            { 'title': 'Apps','id':1, 'intrested': false },
            { 'title': 'Apps','id':1, 'intrested': false },
            { 'title': 'Apps','id':1, 'intrested': false },
            { 'title': 'Film and Video','id':1, 'intrested': false },
            { 'title': 'Animation','id':1, 'intrested': false },
            { 'title': 'Graphics','id':1, 'intrested': false },
            { 'title': 'UI and UX','id':1, 'intrested': false },
            { 'title': 'Webites','id':1, 'intrested': false },
            { 'title': 'Apps','id':1, 'intrested': false }
        ];
        $scope.sports = [
            { 'title': 'Football', 'intrested': false },
            { 'title': 'Cricket', 'intrested': false },
            { 'title': 'Basketball', 'intrested': false },
            { 'title': 'Volleyball', 'intrested': false },
            { 'title': 'Badminton', 'intrested': false },

            { 'title': 'Chess', 'intrested': false }
        ];
        $scope.cultural = [
            { 'title': 'Dancing', 'intrested': false },
            { 'title': 'Acting', 'intrested': false },
            { 'title': 'Debating', 'intrested': false },
            { 'title': 'Film Making', 'intrested': false },

            { 'title': 'Music', 'intrested': false },
            { 'title': 'Photography', 'intrested': false }
        ];
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
            $auth.authenticate(provider).then(function(response) {
                    $scope.signUp.token = response.access_token;
                    $scope.signUp.type = provider;
                    $scope.signUp.skills = $scope.selectedSkills;
                    $scope.signUp.intrests = $scope.interests;
                    $scope.signUp.college_id = $scope.college;
                    $scope.signUp.college_id = 1;
                    console.log("then");
                    tokenService.post("signup", $scope.signUp)
                        .then(function(abc) {
                            localStorage.setItem('id_token', abc.token);
                            $rootScope.token = abc.token;
                            $state.go("home.dashboard");
                            return;
                        }).catch(function(abc) {
                            localStorage.setItem('id_token', abc.token);
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
                            $state.go("home.dashboard");
                            return;
                        }).catch(function(abc) {

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
            // console.log(event);
            $scope.signUp.token = response.access_token ? response.access_token : response.token;
            $scope.signUp.type = "google";
            $scope.signUp.skills = $scope.selectedSkills;
            $scope.signUp.intrests = $scope.interests;
            $scope.signUp.college_id = $scope.college;
            $scope.signUp.college_id = 1;

            tokenService.post("signup", $scope.signUp)
                .then(function(abc) {
                    console.log(abc);
                    localStorage.setItem('id_token', abc.token);
                    $rootScope.token = abc.token;
                    $state.go("home.dashboard");
                    return;

                }).catch(function(abc) {

                });

            // $scope.$apply(function() {

            //     $scope.currentState = 2;
            // })
            $timeout(function() {
                $scope.currentState = 2;
                // $scope.someData = someData;
            }, 0);
        })


    }
})();
