(function() {

    angular
        .module('app')
        .controller('StaticController', [
            'navService', '$mdSidenav', '$log', '$q', '$state', '$scope', '$mdToast',
            StaticController
        ]);

    function StaticController(navService, $mdSidenav, $log, $q, $state, $scope, $mdToast) {

        var vm = this;

        if (typeof document.getElementById('basicveryimportantloading') !== 'undefined' && document.getElementById('basicveryimportantloading')!=null) {
            document.getElementById('basicveryimportantloading').remove();
        }
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

        vm.title = $state.current.data.title;

        navService
            .loadAllItems()
            .then(function(menuItems) {
                vm.menuItems = [].concat(menuItems);
            });

        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }

        function toggleItemsList() {

            pending.then(function() {
                $mdSidenav('left').toggle();
            });
        }

        function selectItem(item) {
            vm.title = item.name;
            vm.toggleItemsList();
            vm.showSimpleToast(vm.title);
        }

    }

})();
