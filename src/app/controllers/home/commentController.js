(function(){
  'use strict';
  angular
  .module('app')
  .controller('CommentController', ['$mdDialog','$scope','tokenService',CommentController]);

  function CommentController($mdDialog, $scope, tokenService) {
    $scope.originatorEv;

    $scope.openMenu = function($mdMenu, ev) {
      $scope.originatorEv = ev;
      $mdMenu.open(ev);
    };

    $scope.originatorEv = null;
  }
})();