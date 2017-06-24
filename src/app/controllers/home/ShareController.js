    'use strict';
    (function() {
        angular.module('app')
            .controller('ShareController', ['$scope', '$mdDialog', ShareController]);

        function ShareController($scope, $mdDialog) {
            $scope.showCustom = function($event, type , id) {
                if (type === 'event') {
                    $scope.type = 'event';
                    $scope.shareUrl = 'https://campusbox.org/dist/singleEvent/'+id;
                } else {
                    $scope.type = 'creativity';
                    $scope.shareUrl = 'https://campusbox.org/dist/singleContent/'+id;
                }
                //actual dialog
                $mdDialog.show({
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    targetEvent: $event,
                    templateUrl: 'app/views/partials/shareLinks.html',
                    controller: 'DialogController'
                });

              
            }


        }

    })();
