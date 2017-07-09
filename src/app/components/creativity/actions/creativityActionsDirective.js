(function() {
    'use strict';

    angular.module('app').
    directive('creativityActions', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/actions/creativityActions.html',

            controller: function($scope, $mdDialog, $state, creativityActionsService) {

                $scope.showLikes = function(id, title) {
                    $mdDialog.show({
                        controller: 'ShowLikesController',
                        templateUrl: 'app/dialogs/showLikes.html',
                        parent: angular.element(document.body),
                        scope: $scope,
                        locals: {
                            title: title,
                            id: id
                        },
                        preserveScope: true,
                        escapeToClose: true,
                        fullscreen: true,
                        clickOutsideToClose: true,
                        controllerAs: 'dc'
                    })
                }
                $scope.openProfile = function($event, username) {
                    $event.stopPropagation();
                    $state.go('home.profile', { username: username });
                };
                $scope.bookmark = function(content, index) {
                    creativityActionsService.bookmark(content);   
                }
                $scope.heart = function(content, $index) {
                    creativityActionsService.heart(content, $index);
                }

            }
        };
    });

})();
