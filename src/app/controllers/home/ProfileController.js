(function() {

    angular
        .module('app')
        .controller('ProfileController', [
            '$mdDialog',
            '$scope',
            'allDataService',
            '$stateParams',
            '$state',
            ProfileController
        ]);

    function ProfileController($mdDialog, $scope, allDataService, $stateParams, $state) {
        var vm = this;
        console.log("abc");
        $scope.tab = $stateParams.tab;
        console.log($scope.tab);
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/partials/completeProfile.html',
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
        allDataService.get("events/Cultural")
            .then(function(events) {
                vm.events = [].concat(events.data)
                console.log("aa");
            });

    }

})();
