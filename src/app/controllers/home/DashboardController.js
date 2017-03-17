(function() {

    angular
        .module('app')
        .controller('DashboardController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            'Upload',
            '$location',
            DashboardController
        ]);

    function DashboardController($mdDialog, $scope, tokenService, Upload, $location) {
        $scope.events = {};
        $scope.eventLoading = true;
        $scope.contentLoading = true;
        $scope.tags = ['AngularJs', 'Web Developement', 'Elon Musk', 'Poetry', 'Artificial Intelligence', 'Product Design', 'Feminism', 'Technology', 'Self Driving Cars'];
        $scope.openEvent = function(event) {
            $location.path('/singleEvent/' + event.id);
        }

        $scope.heartEvent = function(event, $index) {
            $scope.events[$index].Actions.Bookmarked.status = !$scope.events[$index].Actions.Bookmarked.status;
            if ($scope.events[$index].Actions.Bookmarked.status) {
                $scope.events[$index].Actions.Bookmarked.total += 1;
                tokenService.post('bookmarkEvent/' + event.id).then(function(result) {

                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.events[$index].Actions.Bookmarked.total -= 1;

                tokenService.delete('bookmarkEvent/' + event.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }
        $scope.rsvpEvent = function(event, $index) {
            $scope.events[$index].Actions.Participants.status = !$scope.events[$index].Actions.Participants.status;
            if ($scope.events[$index].Actions.Participants.status) {
                $scope.events[$index].Actions.Participants.total += 1;
                tokenService.post('rsvpEvent/' + event.id).then(function(result) {

                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            } else {
                $scope.events[$index].Actions.Participants.total -= 1;

                tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        }

        tokenService.get("/eventsDashboard")
            .then(function(events) {
                $scope.events = events.data;
                $scope.eventLoading = false;
                console.log($scope.events);
            });

        tokenService.get("/eventsTop")
            .then(function(eventsTop) {
                $scope.eventsTop = eventsTop.data;
                $scope.eventLoading = false;
                console.log($scope.eventsTop);
            });
        tokenService.get("/contentsDashboard")
            .then(function(contentsDashboard) {
                $scope.contentsDashboard = contentsDashboard.data;
                $scope.contentLoading = false;
                console.log($scope.contentsDashboard);
            });
        tokenService.get("/contentsTop")
            .then(function(contentsTop) {
                $scope.contentsTop = contentsTop.data;
                $scope.contentLoading = false;
                console.log($scope.contentsTop);
            });

    }


})();
