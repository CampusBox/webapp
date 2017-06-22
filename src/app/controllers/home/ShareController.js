    'use strict';
    (function() {
        angular.module('app')
            .controller('ShareController', ['$scope', '$mdDialog', ShareController]);

        function ShareController($scope, $mdDialog) {
            $scope.showCustom = function($event, type) {
                if (type === 'event') {
                    $scope.type = 'event';
                    $scope.actualShareUrl = '';
                    $scope.shareUrl = 'https://campusbox.org/dist/singleEvent/';
                } else {
                    $scope.type = 'creativity';
                    $scope.shareUrl = 'https://campusbox.org/dist/singleContent/';
                }
                //actual dialog
                $mdDialog.show({
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    targetEvent: $event,
                    templateUrl: 'app/views/partials/shareLinks.html',
                    controller: DialogController
                });

                function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function() {
                        console.log('CLOSING DIALOG');
                        $mdDialog.hide();
                    };
                }
            }


        }

    })();
