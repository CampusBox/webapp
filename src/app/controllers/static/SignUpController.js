(function() {

    angular
        .module('app')
        .controller('SignUpController', [
            '$scope', 'loginData', '$rootScope', '$localStorage', '$state', 'collegesListService',
            SignUpController
        ]);

    function SignUpController($scope, loginData, $rootScope, $localStorage, $state, collegesListService) {
        var vm = this;
        $scope.currentState = 1;
        $scope.user = { college: "", roll: "" };
        $rootScope.$on('event:social-sign-in-success', function(event, userDetails) {
            console.log(userDetails);
            $scope.user.name = userDetails.name;
            $scope.user.email = userDetails.email;
            $scope.user.gender = "";
            $scope.user.imageUrl = userDetails.imageUrl;
            $scope.user.provider = userDetails.provider;
            console.log($scope.user);
            $scope.$apply(function() {

                $scope.currentState = 2;
            })
        })




        var pendingSearch, cancelSearch = angular.noop;
        var lastSearch;

        vm.allContacts = ['abc', 'sffa0', 'dfadadf0', 'qqwwqewqe'];
        vm.contacts = [vm.allContacts[0]];
        vm.asyncContacts = [];
        vm.filterSelected = true;

        vm.querySearch = querySearch;

        /**
         * Search for contacts; use a random delay to simulate a remote call
         */
        function querySearch(criteria) {
            return criteria ? vm.allContacts.filter(createFilterFor(criteria)) : [];
        }

        vm.colleges = [];
        collegesListService
            .loadAllItems()
            .then(function(colleges) {
                vm.colleges = [].concat(colleges);
                console.log(vm.colleges);
            });
        $scope.doLogin = function(customer) {
            console.log('attempt');
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
