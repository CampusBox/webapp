(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('SingleEventController', [
            '$mdDialog',
            '$scope',
            'events',
            'index',
             'Upload',
             '$timeout',
            SingleEventController
        ]);

    function SingleEventController($mdDialog, $scope, events, index, Upload, $timeout) {
        $scope.index = index;
        $scope.event = events[index];
        $scope.events = events;
        $scope.upload = function (dataUrl, name) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                        file: Upload.dataUrltoBlob(dataUrl, name)
                    },
                }).then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0) $scope.errorMsg = response.status 
                        + ': ' + response.data;
                }, function (evt) {
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
            if (index<0) {
                index = $scope.events.length -1;
            }else if(index == $scope.events.length){
                index = 0;
            }
            $mdDialog.show({
                    controller: 'SingleEventController',
                    templateUrl: 'app/views/partials/singleEvent.html',
                    targetEvent : ev,
                    // openFrom : "",
                    locals: {
                        events: $scope.events,
                        index : index
                    },
                    targetEvent: ev,
                    closeTo : '#'+close,
                    openFrom : '#'+open,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
        $scope.heart = function() {
            $scope.events[$scope.index].Actions.Bookmarked.status = !$scope.events[$scope.index].Actions.Bookmarked.status;
            if ($scope.events[$scope.index].Actions.Bookmarked.status) {
                $scope.events[$scope.index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkEvent/' + $scope.event.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.events[$scope.index].Actions.Bookmarked.total -= 1;

                tokenService.delete('bookmarkEvent/' + $scope.event.id, '').then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        $scope.update = function() {
            $scope.events[$scope.index].Actions.Participants.status = !$scope.events[$scope.index].Actions.Participants.status;
            if ($scope.events[$scope.index].Actions.Participants.status) {
                $scope.events[$scope.index].Actions.Participants.total += 1;
                tokenService.post('ParticipantsEvent/' + $scope.event.id).then(function(result) {

                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.events[$scope.index].Actions.Participants.total -= 1;

                tokenService.delete('ParticipantsEvent/' + $scope.event.id, '').then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }

    }
})();
