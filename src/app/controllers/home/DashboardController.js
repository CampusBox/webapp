(function() {

    angular
        .module('app')
        .controller('DashboardController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            'Upload',
            DashboardController
        ]);

    function DashboardController($mdDialog, $scope, tokenService, Upload) {
        $scope.events = {};
        $scope.tags = ['AngularJs', 'Web Developement', 'Elon Musk', 'Poetry', 'Artificial Intelligence', 'Product Design', 'Feminism', 'Technology', 'Self Driving Cars'];

        $scope.imagePath = "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_284x96dp.png";
            tokenService.get("contents")
                .then(function(tableData) {
                    $scope.blogs = tableData.data;
                    console.log($scope.blogs);
                });

        tokenService.get("events")
            .then(function(events) {
                $scope.events = events.data
            });
    }


})();
