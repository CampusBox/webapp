(function() {

    angular
        .module('app')
        .controller('EventsController', [
            '$mdDialog',
            '$scope',
            '$element',
            'tokenService',
            '$timeout',
            '$location',
            '$state',
            '$rootScope',
            EventsController
        ]);

    function EventsController($mdDialog, $scope, $element, tokenService,  $timeout, $location, $state, $rootScope) {
        var vm = this;
        $rootScope.currentPageBackground = $rootScope.gray;
        $rootScope.title = "Opportunities";

        // ####################################################################################
        // EVENTS OLD PAGING FUNCTION DONT REMOVE
        // $scope.myPagingFunction = function() {
        //     console.log('paging');
        //     if ($scope.loading == false && $scope.moreItems == true) {
        //         $scope.loading = true;
        //         tokenService.get("events?limit=2&offset=" + $scope.offset)
        //             .then(function(tableData) {
        //                 $scope.loading = false;
        //                 if (tableData.data.length < 2) {
        //                     console.log("more items: " + $scope.moreItems);
        //                     $scope.moreItems = false;
        //                 }
        //                 $scope.events = $scope.events.concat(tableData.data);
        //                 $scope.offset = tableData.meta.offset;
        //                 console.log($scope.offset);
        //             });
        //     }
        // };
        // ####################################################################################
        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });
        vm.activated = true;
    }

})();
