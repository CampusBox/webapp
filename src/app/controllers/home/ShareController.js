(function(){

	angular.module('app')
          .controller('ShareController',['$scope','$mdDialog',ShareController]);

         function ShareController ($scope, $mdDialog) {

			
            $scope.showCustom = function(event,type) {
               if(type === 'event'){
                  $scope.type = 'event';
                  $scope.shareUrl = 'https://campusbox.org/dist/singleEvent/';
               }else{
                  $scope.type = 'creativity';
                  $scope.shareUrl = 'https://campusbox.org/dist/singleContent/';
               }
               $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true,           
                  templateUrl: 'app/views/partials/shareLinks.html',
                  controller: function DialogController($scope, $mdDialog) {
                     $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                  }
               });
            };
         }                 


})();