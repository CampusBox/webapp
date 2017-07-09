(function() {
                  // Controller for selecting License//
    angular
    .module('app')
    .controller('SelectLicenseController', function($scope, $element, $mdDialog) {
      $scope.licenses = ['license 1' ,'license 2' ,'license 3' ,'license 4' ,'license 5', 'license 6'];
      $scope.searchTerm;
      $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
      };
     
      $element.find('input').on('keydown', function(ev) {
          ev.stopPropagation();
      });
       $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
            console.log('success');
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }); 

})();