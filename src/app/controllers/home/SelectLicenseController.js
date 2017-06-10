(function() {
    angular
    .module('selectLicense', [])
    .controller('SelectLicenseController', function($scope,$mdDialog) {
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
      $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
            console.log('asasc');
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    });  
})();