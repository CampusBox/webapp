(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('DialogController', [
            '$mdDialog',
            '$scope',
            '$timeout',
            DialogController
        ]);

    function DialogController($mdDialog, $scope,  $timeout) {
        $scope.event = {};
      
       
            //
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.closeDialog = function() {
            $mdDialog.cancel();
            console.log('asasc');
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
