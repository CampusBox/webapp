(function(){
'use strict';
	angular.module('app')
          .controller('LicenseController',['$scope','$mdDialog',LicenseController]);

         function LicenseController ($scope, $mdDialog) {


			
            $scope.showCustom = function($event) {
             
               //actual dialog
               $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,        
                  preserveScope: true,
                  targetEvent: $event,           
                  templateUrl: 'app/views/partials/license.html',
                  controller: SelectLicenseController
               });

               function SelectLicenseController($scope, $mdDialog) {
                     $scope.closeDialog = function() {
                        console.log('CLOSING DIALOG');
                        $mdDialog.hide();
                     };
               } 
            }

          
            }
 

})();