(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('SingleEventController', [
            '$mdDialog',
            '$scope',
            'Upload',
            '$timeout',
            'tokenService',
            '$stateParams',
            '$sce',
            '$rootScope',
            SingleEventController
        ]);


    function SingleEventController($mdDialog, $scope, Upload, $timeout, tokenService, $stateParams, $sce, $rootScope) {
        $scope.event = {};
        $scope.loading = true;
        $scope.eventId = $stateParams.eventId;
        console.log($scope.eventId);
        tokenService.get("event/" + $scope.eventId)
            .then(function(tableData) {
                tableData.data[0].details.description = $sce.trustAsHtml(tableData.data[0].details.description);
                $scope.event = tableData.data[0];
                $scope.loading = false;
                console.log($scope.event);
            });
        console.log($scope.event);

        $scope.upload = function(dataUrl, name) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                        file: Upload.dataUrltoBlob(dataUrl, name)
                    },
                }).then(function(response) {
                    $timeout(function() {
                        $scope.result = response.data;
                    });
                }, function(response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
            //
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
            console.log('asasc');
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $scope.showEvent = function(ev, index, open, close) {
            if (index < 0) {
                index = $scope.event.length - 1;
            } else if (index == $scope.event.length) {
                index = 0;
            }
            $mdDialog.show({
                    controller: 'SingleEventController',
                    templateUrl: 'app/views/partials/singleEvent.html',
                    targetEvent: ev,
                    // openFrom : "",
                    locals: {
                        events: $scope.event,
                        index: index
                    },
                    targetEvent: ev,
                    closeTo: '#' + close,
                    openFrom: '#' + open,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
        $scope.heart = function(event) {
            if ($rootScope.authenticated) {
                $scope.event.Actions.Bookmarked.status = !$scope.event.Actions.Bookmarked.status;
                if ($scope.event.Actions.Bookmarked.status) {
                    $scope.event.Actions.Bookmarked.total += 1;
                    tokenService.post('bookmarkEvent/' + event.id).then(function(result) {

                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                } else {
                    $scope.event.Actions.Bookmarked.total -= 1;

                    tokenService.delete('bookmarkEvent/' + event.id, '').then(function(result) {
                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.heart(event);
                });
            }

        }
        $scope.update = function(event) {
            if ($rootScope.authenticated) {
                $scope.event.Actions.Participants.status = !$scope.event.Actions.Participants.status;
                if ($scope.event.Actions.Participants.status) {
                    $scope.event.Actions.Participants.total += 1;
                    tokenService.post('ParticipantsEvent/' + event.id).then(function(result) {

                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                } else {
                    $scope.event.Actions.Participants.total -= 1;

                    tokenService.delete('ParticipantsEvent/' + event.id, '').then(function(result) {
                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.update(event, $index);
                });
            }

        }
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
})();
