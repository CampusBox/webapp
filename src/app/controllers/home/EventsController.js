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
        $scope.showReport = function(ev) {
            $mdDialog.show({
                    controller: DialogController,
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
            $scope.event = {};
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

            $scope.con = function(a) {
                var selectDay = "day";
                var selectTime = "time";
                delete a[selectDay];
                delete a[selectTime];
                console.log(a);
                allDataService.post('students/', a).then(function(result) {
                    if (result.status != 'error') {
                        // var x = angular.copy(coupon);
                        // x.save = 'insert';
                        // x.id = result.data;
                        // $uibModalInstance.close(x);
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }

        }
        vm.tableData = [{
            "id": -1,
            "name": " ",
            "description": " ",
            "venue": " ",
            "date": " ",
            "time": " ",
            "cost": " ",
            "societyid": 1,
            "short_description": null,
            "image": "grey.png"
        }, {
            "id": -1,
            "name": " ",
            "description": " ",
            "venue": " ",
            "date": " ",
            "time": " ",
            "cost": " ",
            "societyid": 1,
            "short_description": null,
            "image": "grey.png"
        }, {
            "id": -1,
            "name": " ",
            "description": " ",
            "venue": " ",
            "date": " ",
            "time": " ",
            "cost": " ",
            "societyid": 1,
            "short_description": null,
            "image": "grey.png"
        }];;
        vm.activated = true;
        allDataService.get("events/Cultural")
            .then(function(tableData) {
                vm.tableData = [].concat(tableData.data)
                vm.activated = false;
            });
    }

})();
