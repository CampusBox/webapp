(function(){

	angular.module('app')
          .controller('ShareController',['$scope','$mdDialog',ShareController]);

         function ShareController ($scope, $mdDialog) {

			
            $scope.showCustom = function(event) {
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