(function() {

    angular
        .module('app')
        .controller('LoginController', [
            'allDataService','$scope','loginData','$rootScope','$localStorage','$state',
            LoginController
        ]);

    function LoginController(allDataService,$scope,loginData,$rootScope,$localStorage,$state) {
        var vm = this;
        $scope.doLogin = function(customer) {
            console.log('attempt');
            $scope.showLoading = true;
            // $location.path('/dashboard');

            loginData.post('login', {
                customer: customer
            }).then(function(results) {


                console.log(results);
                if (results.status == "success") {
                    //  toastr.success('Welcome!');
                    $rootScope.authenticated = true;
                    $rootScope.roll = results.roll;
                    $rootScope.name = results.name;
                    $rootScope.gender = results.gender;
                    $rootScope.hostel = results.hostel;
                    $rootScope.batch_code = results.batch_code;
                    $rootScope.branch = results.branch;
                    $rootScope.year = results.year;
                    $rootScope.room = results.room;
                    $rootScope.url = results.url;

                    $localStorage.authenticated = true;
                    $localStorage.roll = results.roll;
                    $localStorage.name = results.name;
                    $localStorage.gender = results.gender;
                    $localStorage.hostel = results.hostel;
                    $localStorage.batch_code = results.batch_code;
                    $localStorage.branch = results.branch;
                    $localStorage.year = results.year;
                    $localStorage.room = results.room;
                    $localStorage.url = results.url;

                    // $rootScope.$loginData.method = 0; //brinjal own sign up
                    console.log($rootScope.$loginData);
                    event.preventDefault();
                    $state.go('home.dashboard', { location: 'replace' })
                } else {
                    $scope.showLoading = false;
                    alert('Nope, not your credentials!');

                    //toastr.danger('Sorry, your credentials are invalid. Please check again.');
                }
            });
        };
        vm.tableData = [];

        allDataService.get("blog_posts")
            .then(function(tableData) {
                vm.tableData = [].concat(tableData.data)
            });
    }

})();
