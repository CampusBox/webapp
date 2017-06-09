// (function(){
// 'use strict';
	// angular.module('app')
 //          .controller('LicenseController',['$scope','$mdDialog',LicenseController]);

 //         function LicenseController ($scope, $mdDialog) {


			
 //            $scope.showCustom = function($event) {
             
 //               //actual dialog
 //               $mdDialog.show({
 //                  clickOutsideToClose: true,
 //                  scope: $scope,        
 //                  preserveScope: true,
 //                  targetEvent: $event,           
 //                  templateUrl: 'app/views/partials/license.html',
 //                  controller: DialogController
 //               });

 //               function DialogController($scope, $mdDialog) {
 //                     $scope.closeDialog = function() {
 //                        console.log('CLOSING DIALOG');
 //                        $mdDialog.hide();
 //                     };
 //               } 
 //            }

          
 //            }
 angular
    .module('selectLicense', ['ngMaterial'])
    .controller('SelectLicenseController', function($scope) {
      $scope.licenses = [
        {  name: 'license1' },
        {  name: 'license2' },
        {  name: 'license3' },
        {  name: 'license4' },
      ];
       $scope.selectedLicenses = [];
       $scope.printSelectedLicenses = function printSelectedLicenses() {
        var numberOfLicenses = this.selectedLicenses.length;

        if (numberOfLicenses > 1) {
          var needsOxfordComma = numberOfLicenses > 2;
          var lastLicenseConjunction = (needsOxfordComma ? ',' : '') + ' and ';
          var lastLicense = lastLicenseConjunction +
              this.selectedLicenses[this.selectedLicenses.length - 1];
          return this.selectedLicenses.slice(0, -1).join(', ') + lastLicense;
        }

        return this.selectedLicenses.join('');
      };
    });

// })();