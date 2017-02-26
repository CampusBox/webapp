(function() {

    angular
        .module('app')
        .controller('SignUpController', [
            '$scope', '$timeout', 'loginData', '$rootScope', '$localStorage', '$state', 'collegesListService', 'tokenService',
            SignUpController
        ]);

    function SignUpController($scope, $timeout, loginData, $rootScope, $localStorage, $state, collegesListService, tokenService) {
        var vm = this;
        vm.tags = [];
        $scope.items = [{ 'title': 'Drama', 'intrested': false },
            { 'title': 'Writing', 'intrested': false },
            { 'title': 'technology', 'intrested': false }
        ];

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

        $scope.finish

        // skills chips end
        // function DemoCtrl($timeout, $q) {

        $scope.readonly = false;
        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.querySearch = querySearch;
        $scope.vegetables = loadVegetables();
        $scope.selectedVegetables = [];
        $scope.autocompleteDemoRequireMatch = false;
        $scope.transformChip = transformChip;

        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip }
        }

        /**
         * Search for vegetables.
         */
        function querySearch(query) {
            var results = query ? $scope.vegetables.filter(createFilterFor(query)) : [];
            return results;
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0);
            };

        }

        function loadVegetables() {
            vm.veggies = [];
            tokenService.get("events")
                .then(function(veggies) {
                    vm.veggies = [].concat(veggies.data)
                    vm.activated = false;
                });

            return vm.veggies.map(function(veg) {
                veg._lowername = veg.name.toLowerCase();
                return veg;
            });
        }
        // }

        // skills chips end
        var pendingSearch, cancelSearch = angular.noop;
        var lastSearch;

        vm.allContacts = ['abc', 'sffa0', 'dfadadf0', 'qqwwqewqe'];
        vm.contacts = [vm.allContacts[0]];
        vm.asyncContacts = [];
        vm.filterSelected = true;

        vm.colleges = [];
        collegesListService
            .loadAllItems()
            .then(function(colleges) {
                vm.colleges = [].concat(colleges);
            });
        $scope.doLogin = function(user) {
            console.log('attempt');
            user.interests = $scope.interests;
            user.skills = $scope.selectedVegetables;
            console.log(user);
            allDataService.post('students/', user).then(function(result) {
                if (result.status != 'error') {
                    console.log(result.status);
                } else {
                    console.log(result);
                }
            });
            $scope.showLoading = true;
            // $location.path('/dashboard');
            // function querySearch(query) {
            //     console.log('abc' + query);
            //     var results = query ? vm.colleges.filter(createFilterFor(query)) : vm.colleges,
            //         deferred;
            //     if (vm.simulateQuery) {
            //         deferred = $q.defer();
            //         $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
            //         return deferred.promise;
            //     } else {
            //         return results;
            //     }
            // };
            vm.querySearch = function(query) {
                return $http.get("https://api.github.com/search/users", { params: { q: query } })
                    .then(function(response) {
                        return response.data.items;
                    })
            }


            loginData.post('login', {
                customer: customer
            }).then(function(results) {


                console.log(results);
                if (results.status == "success") {

                    $localStorage.user = angular.copy(results);
                    $localStorage.authenticated = true;


                    // $rootScope.$loginData.method = 0; //brinjal own sign up
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
    }

})();
