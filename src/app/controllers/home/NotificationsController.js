(function(){

  angular
    .module('app')
    .controller('NotificationsController', [
      'notificationsService',
      NotificationsController
    ]);

  function NotificationsController(notificationsService) {
    var vm = this;

    vm.messages = [];

    notificationsService
      .loadAllItems()
      .then(function(messages) {
        vm.messages = [].concat(messages);
      });
  }

})();
