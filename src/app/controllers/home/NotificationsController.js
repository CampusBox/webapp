(function(){

  angular
    .module('app')
    .controller('NotificationsController', [
      'tokenService',
      NotificationsController
    ]);

  function NotificationsController(tokenService) {
    var vm = this;

    vm.messages = [];

    tokenService.get("notifications")
                    .then(function(response) {
                        $scope.loading = false;
                        $scope.notifications = response.data;
                    });
  }

})();
