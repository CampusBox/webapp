(function() {

    angular
        .module('app')
        .controller('SignUpController', [
            '$scope', '$timeout', 'loginData', '$rootScope', '$localStorage', '$state', 'collegesListService', 'tokenService','$auth',
            SignUpController
        ]);

    function SignUpController($scope, $timeout, loginData, $rootScope, $localStorage, $state, collegesListService, tokenService,$auth) {
        var vm = this;
        $scope.querySearch = querySearch;

        vm.tags = [];
        $scope.skills = loadSkills();
        $scope.continue = false;
        $scope.items = [
            { 'title': 'Articles', 'intrested': false },
            { 'title': 'Poetry', 'intrested': false },
            { 'title': 'Drama', 'intrested': false },
            { 'title': 'Painting', 'intrested': false },
            { 'title': 'Sketching', 'intrested': false },
            { 'title': 'Manga', 'intrested': false },
            { 'title': 'Craft', 'intrested': false },
            { 'title': 'Song Covers', 'intrested': false },
            { 'title': 'Instrumental', 'intrested': false },
            { 'title': 'Music Mixing', 'intrested': false },
            { 'title': 'Photography', 'intrested': false },

            { 'title': 'Apps', 'intrested': false },
            { 'title': 'Apps', 'intrested': false },
            { 'title': 'Apps', 'intrested': false },
            { 'title': 'Apps', 'intrested': false },
            { 'title': 'Film and Video', 'intrested': false },
            { 'title': 'Animation', 'intrested': false },
            { 'title': 'Graphics', 'intrested': false },
            { 'title': 'UI and UX', 'intrested': false },
            { 'title': 'Webites', 'intrested': false },
            { 'title': 'Apps', 'intrested': false }
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

        $scope.authenticate = function(provider) {

        $auth.authenticate(provider).then(function(response) {
                console.log(response);
                console.log(provider);
                console.log($scope.selectedSkills);
                tokenService.post("signup", response)
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
    $scope.user = { college: "", roll: "" };

    $rootScope.$on('event:social-sign-in-success', function(event, userDetails) {
        // console.log("Social sign in success")
        // console.log(userDetails);
        // console.log(event);
        $scope.user.name = userDetails.name;
        $scope.user.email = userDetails.email;
        $scope.user.gender = "";
        $scope.user.imageUrl = userDetails.imageUrl;
        $scope.user.provider = userDetails.provider;
        // $scope.$apply(function() {

        //     $scope.currentState = 2;
        // })
        $timeout(function() {
            $scope.currentState = 2;
            // $scope.someData = someData;
        }, 0);
    })


}})();
