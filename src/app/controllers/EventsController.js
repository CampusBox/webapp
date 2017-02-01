(function() {

    angular
        .module('app')
        .controller('EventsController', [
            '$mdDialog',
            '$scope',
            'allDataService',
            'Upload',
            EventsController
        ]);

    function EventsController($mdDialog, $scope, allDataService,Upload) {
        var vm = this;

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
        $scope.showUpdates = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/partials/eventUpdates.html',
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
   $scope.addUpdate = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/partials/addUpdate.html',
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

        $scope.showParticipants = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/views/partials/showParticipants.html',
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
        vm.tableData = [];
        vm.activated = true;
        allDataService.get("events/Cultural")
            .then(function(tableData) {
                vm.tableData = [].concat(tableData.data)
                vm.activated = false;
            });
    }

})();
