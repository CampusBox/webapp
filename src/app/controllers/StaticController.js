(function(){

  angular
       .module('app')
       .controller('StaticController', [
          'navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state','$scope', '$mdToast',
          StaticController
       ]);

  function StaticController(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state,$scope, $mdToast) {
    
    var vm = this;

    vm.visitor = {};
    vm.loaded = false;

    // $scope.$on('TAWKTO:onLoad', function () {
    //   $scope.$apply(setVisitor);
    //   vm.loaded = true;
    // });

    //YOUR TAWK.TO ID GOES HERE
    vm.id = "58c4061293cfd3557208c461";

    // vm.toggle = tawkToService.toggle;
    // vm.toggleVisibility = tawkToService.toggleVisibility;

    // function setVisitor() {
    //   vm.visitor = tawkToService.setVisitor('ngTawkTo Demo User', 'demo@demo.com');
    // }

    vm.menuItems = [ ];
    vm.selectItem = selectItem;
    vm.toggleItemsList = toggleItemsList;
    vm.showActions = showActions;
    vm.title = $state.current.data.title;
    vm.showSimpleToast = showSimpleToast;
    vm.toggleRightSidebar = toggleRightSidebar;

    navService
      .loadAllItems()
      .then(function(menuItems) {
        vm.menuItems = [].concat(menuItems);
      });

    function toggleRightSidebar() {
        $mdSidenav('right').toggle();
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    function selectItem (item) {
      vm.title = item.name;
      vm.toggleItemsList();
      vm.showSimpleToast(vm.title);
    }

  }

})();
