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
        $scope.events = {};
        $scope.tags = ['AngularJs', 'Web Developement', 'Elon Musk', 'Poetry', 'Artificial Intelligence', 'Product Design', 'Feminism', 'Technology', 'Self Driving Cars'];

        $scope.imagePath = "https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_284x96dp.png";

        allDataService.get("events/Cultural")
            .then(function(events) {
                $scope.events = [].concat(events.data)
            });
    }

})();
