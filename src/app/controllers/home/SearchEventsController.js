(function() {

    angular
        .module('app')
        .controller('SearchEventsController', [
            '$mdDialog',
            '$scope',
            '$element',
            'tokenService',
            '$stateParams',
            '$state',
            '$rootScope',
            SearchEventsController
        ]);

    function SearchEventsController($mdDialog, $scope, $element, tokenService, $stateParams, $state, $rootScope) {
        var vm = this;
        $scope.query = $stateParams.query;
        $scope.searchText = $stateParams.query;
        $scope.events = [];
        $scope.loading = true;
               $rootScope.currentPageBackground = $rootScope.gray;
        $rootScope.title = $stateParams.query+" in opportunities ";
        tokenService.get("search/events/" + $scope.query)
            .then(function(tableData) {
                $scope.events = tableData.data;
            });

        $scope.filters = [];

        $scope.searchTypes = [];

        $scope.searchedFast = function(text) {
             $state.go('home.searchEvents', { query: text });
        };

        $scope.searched = function(item, text) {
            if (item == 'events') {
                $state.go('home.searchEvents', { query: text });
            } else if (item == 'creativity') {
                $state.go('home.searchCreativity', { query: text });
            } else if (item == 'students') {
                $state.go('home.searchStudents', { query: text });
            } else if(item == 'searchAll'){
                $state.go('home.searchAll', { query: text });

            }
        };
        $scope.searchTerm;
        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };
        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });
        vm.activated = true;
    }

})();
