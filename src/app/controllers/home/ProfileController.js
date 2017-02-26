(function() {

    angular
        .module('app')
        .controller('ProfileController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$stateParams',
            '$state',
            ProfileController
        ]);

    function ProfileController($mdDialog, $scope, tokenService, $stateParams, $state) {
        var vm = this;
        $scope.followers = [{'name':'Rohan Goel','image':'https://avatars2.githubusercontent.com/u/14099191?v=3&u=e03e9a657eb1e4de7da062cc5a5611092f0f2d7e&s=400', 'about':'Hello there i do this', 'college':'Thapar University'},
                            {'name':'Rohan Goel','image':'https://avatars3.githubusercontent.com/u/6951276?v=3&s=400', 'about':'Hello there i do this', 'college':'Thapar University'}
                            ];
        console.log("abc");
        $scope.tab = $stateParams.tab;
        console.log($scope.tab);
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/partials/addEvent.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }
        allDataService.get("blog_posts")
            .then(function(blogs) {
                vm.blogs = [].concat(blogs.data)
                console.log("aa");
            });
        tokenService.get("events")
            .then(function(events) {
                vm.events = [].concat(events.data)
                console.log("aa");
            });

    }

})();
