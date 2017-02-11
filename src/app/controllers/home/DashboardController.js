(function() {

    angular
        .module('app')
        .controller('DashboardController', [
            '$mdDialog',
            '$scope',
            'allDataService',
            'Upload',
            'ameLightbox',
            'ameLightboxDefaults',
            DashboardController
        ]);

    function DashboardController($mdDialog, $scope, allDataService, Upload, ameLightbox, ameLightboxDefaults) {
        console.log('DashboardController called');
        $scope.imagePath = ".././assets/images/pika.jpg";
        var self = this;
         resetOptions();
         self.items = [
             'http://placehold.it/350x150',
             'http://placehold.it/400x800',
             'http://placehold.it/1200x768',
             'http://placehold.it/500x100'
         ];

         $scope.showDemo = showDemo;
         $scope.resetOptions = resetOptions;

         function showDemo(targetEvent){
            console.log('show demo called');
             ameLightbox.show(self.items, angular.extend({}, self.options, {
                 targetEvent: self.options.targetEvent ? targetEvent : undefined
             }));
         }
         function resetOptions(){
             self.options = angular.copy(ameLightboxDefaults);
             self.options.targetEvent = true;
         }
    }

})();
