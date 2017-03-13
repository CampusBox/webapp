(function() {

    angular
        .module('app')
        .controller('DashboardController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            'Upload',
            '$location',
            DashboardController
        ]);

    function DashboardController($mdDialog, $scope, tokenService, Upload, $location) {
        $scope.events = {};
        $scope.tags = ['AngularJs', 'Web Developement', 'Elon Musk', 'Poetry', 'Artificial Intelligence', 'Product Design', 'Feminism', 'Technology', 'Self Driving Cars'];
        $scope.openEvent = function(event){
         $location.path('/singleEvent/'+event.id);
        }
        $scope.imagePath = "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_284x96dp.png";
            tokenService.get("contents")
                .then(function(tableData) {
                    $scope.contents = tableData.data;
                    console.log($scope.contents);
                });

        tokenService.get("events")
            .then(function(events) {
                $scope.events = events.data
            });
    }


})();
