(function() {

    angular
        .module('app')
        .controller('DashboardController', [
            '$mdDialog',
            '$scope',
            'allDataService',
            'Upload',
            DashboardController
        ]);

    function DashboardController($mdDialog, $scope, allDataService, Upload) {
        $scope.text = '';
        $scope.printText = printText;

        function printText(){
        console.log($scope.text);
            
        }
        $scope.imagePath = ".././assets/images/pika.jpg";
    }

})();
