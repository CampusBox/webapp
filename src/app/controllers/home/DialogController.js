(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('DialogController', [
            '$mdDialog',
            '$scope',
            'Upload',
            '$timeout',
            DialogController
        ]);

    function DialogController($mdDialog, $scope, Upload, $timeout) {
        $scope.event = {};
        //maps autocomplete

        //maps autocomplete finish

        // poster upload
        //IMAGE UPLOAD CODE START
        $scope.upload = function(dataUrl, name) {
                Upload.upload({
                    url: 'https://upload.campusbox.org/imageUpload.php',
                    method: 'POST',
                    file: Upload.dataUrltoBlob(dataUrl, name),
                    data: {
                        'targetPath': './media/'
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
            //IMAGE UPLOAD CODE END
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
