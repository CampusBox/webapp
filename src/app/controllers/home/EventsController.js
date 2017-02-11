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

    function EventsController($mdDialog, $scope, allDataService, Upload) {
        var vm = this;
        $scope.events = {};
        $scope.showReport = function(ev) {
            $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'app/views/partials/showReport.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: false // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
        $scope.showEvent = function(ev, index) {
            console.log(index);
            console.log('showEvent called');
            $mdDialog.show({
                    controller: 'SingleEventController',
                    templateUrl: 'app/views/partials/singleEvent.html',
                    parent: angular.element(document.body),
                    targetEvent : ev,
                    locals: {
                        events: $scope.events,
                        index : index
                    },
                    closeTo: '#left',
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
        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                    controller: 'DialogController',
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
                    controller: 'DialogController',
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
        $scope.addUpdate = function(ev) {
            $mdDialog.show({
                    controller: 'DialogController',
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
        $scope.report = function(){
            console.log('testing report function');
        }
        $scope.showParticipants = function(ev) {
            $mdDialog.show({
                    controller: 'DialogController',
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


        $scope.update = false;
        // $scope.initUpdateIcon = function(eventId){
        //     forea
        // }
        $scope.updateIcon = function(){
            // $scope.update = !update;
            console.log('asascascascdbrththrrb');
            // console.log(eventId + update + 'updateIcon called');
        }
        vm.activated = true;
        allDataService.get("events/Cultural")
            .then(function(tableData) {
                vm.tableData = [].concat(tableData.data)
                vm.activated = false;
                $scope.events = vm.tableData;
            });
    }

})();
