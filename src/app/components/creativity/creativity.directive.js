(function() {
    'use strict';

    angular.module('app').
    directive('creativity', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/creativity.html',

            controller: function($scope, tokenService, $mdDialog, $sce, $state, $filter, $rootScope) {
                $scope.liked = false;
                $scope.creativityLoading = false;
                $scope.offset = 0;
                $scope.moreItems = true;
                $scope.nonFinalContents = [];
                $scope.finalContents = [];
                $scope.types = [
                    { 'title': 'Articles', 'id': 1 },
                    { 'title': 'Poetry', 'id': 2 },
                    { 'title': 'Drama', 'id': 3 },
                    { 'title': 'Paint and Colour', 'id': 4 },
                    { 'title': 'Drawing ', 'id': 5 },
                    { 'title': 'Sewing and Fabric', 'id': 6 },
                    { 'title': 'Craft', 'id': 7 },
                    { 'title': 'Dancing', 'id': 8 },
                    { 'title': 'Singing', 'id': 9 },
                    { 'title': 'Instrumental', 'id': 10 },
                    { 'title': 'Digital Music', 'id': 11 },
                    { 'title': 'Decor', 'id': 12 },
                    { 'title': 'Film and Video', 'id': 13 },
                    { 'title': 'Animation', 'id': 14 },
                    { 'title': 'Graphics', 'id': 15 },
                    { 'title': 'UI and UX', 'id': 16 },
                    { 'title': 'Websites', 'id': 17 },
                    { 'title': 'Programming', 'id': 18 },
                    { 'title': 'Apps', 'id': 19 },
                    { 'title': 'Electronics', 'id': 20 },
                    { 'title': 'DIY', 'id': 21 }
                ];
                $scope.mediaTypes = [4, 5, 6, 7, 12, 15, 16];
                $scope.contents = [];

                $scope.openProfile = function($event, username) {
                    $event.stopPropagation();
                    $state.go('home.profile', { username: username });
                };



            }
        };
    });

})();
