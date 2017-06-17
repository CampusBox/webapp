(function() {

    angular
        .module('app')
        // .service('placeAutocomplete', function() { /* ... */ })
        .controller('SingleEventController', [
            '$mdDialog',
            '$scope',
            '$timeout',
            'tokenService',
            '$stateParams',
            '$sce',
            '$rootScope',
            SingleEventController
        ]);


    function SingleEventController($mdDialog, $scope, $timeout, tokenService, $stateParams, $sce, $rootScope) {
        $scope.event = {};

        $scope.loading = true;
        $scope.eventId = $stateParams.eventId;
        console.log($scope.eventId);
        $rootScope.currentPageBackground = '#fff';

        tokenService.get("event/" + $scope.eventId)
            .then(function(tableData) {
                tableData.data[0].details.description = $sce.trustAsHtml(tableData.data[0].details.description);
                $scope.event = tableData.data[0];
                $rootScope.title = $scope.event.title;
                //console.log(tableData);

                console.log(JSON.parse(angular.toJson($scope.event)));
                $scope.loading = false;
                //console.log($scope.event);
            });
        //console.log($scope.event);




        $scope.upload = function(dataUrl, name) {
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                        file: Upload.dataUrltoBlob(dataUrl, name)
                    },
                }).then(function(response) {
                    $timeout(function() {
                        $scope.result = response.data;
                    });
                }, function(response) {
                    if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
            //
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
            console.log('asasc');
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $scope.showEvent = function(ev, index, open, close) {
            if (index < 0) {
                index = $scope.event.length - 1;
            } else if (index == $scope.event.length) {
                index = 0;
            }
            $mdDialog.show({
                    controller: 'SingleEventController',
                    templateUrl: 'app/views/partials/singleEvent.html',
                    targetEvent: ev,
                    // openFrom : "",
                    locals: {
                        events: $scope.event,
                        index: index
                    },
                    targetEvent: ev,
                    closeTo: '#' + close,
                    openFrom: '#' + open,
                    clickOutsideToClose: true,
                    fullscreen: true // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };
        $scope.heart = function(event) {
            if ($rootScope.authenticated) {
                $scope.event.Actions.Bookmarked.status = !$scope.event.Actions.Bookmarked.status;
                if ($scope.event.Actions.Bookmarked.status) {
                    $scope.event.Actions.Bookmarked.total += 1;
                    tokenService.post('bookmarkEvent/' + event.id).then(function(result) {

                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                } else {
                    $scope.event.Actions.Bookmarked.total -= 1;

                    tokenService.delete('bookmarkEvent/' + event.id, '').then(function(result) {
                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.heart(event);
                });
            }

        };
        $scope.update = function(event) {
            if ($rootScope.authenticated) {
                $scope.event.Actions.Participants.status = !$scope.event.Actions.Participants.status;
                if ($scope.event.Actions.Participants.status) {
                    $scope.event.Actions.Participants.total += 1;
                    tokenService.post('ParticipantsEvent/' + event.id).then(function(result) {

                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                } else {
                    $scope.event.Actions.Participants.total -= 1;

                    tokenService.delete('ParticipantsEvent/' + event.id, '').then(function(result) {
                        if (result.status != 'error') {
                            console.log(result.status);
                        } else {
                            console.log(result);
                        }
                    });
                }
            } else {
                $rootScope.openLoginDialog(function() {
                    $scope.update(event, $index);
                });
            }

        };
        
        //comment system

        // $scope.comments = [
        //     { 'content_response_id': '100', 'content_id': '23', 'timed': '234234234', 'username': $rootScope.user.username, 'response_text': 'This is the comment 1' },
        //     { 'content_response_id': '101', 'content_id': '23', 'timed': '234234234', 'username': 'Ichigo Kurosaki', 'response_text': 'This is the comment 2' }
        // ];
        $scope.comments = {};
        $scope.responseLoading = true;
        $scope.commentInEditMode = false;
        $scope.CommentBeingEdited = null;
        $scope.newComment = '';



        //get all comments at the beginigng
        tokenService.get("responses/" + $scope.eventId)
            .then(function(commentData) {
                console.log(commentData);
            });

        $scope.openMenu = function($mdMenu, ev) {
            $scope.originatorEv = ev;
            $mdMenu.open(ev);
        };
        //post the comment
        $scope.postComment = function(data){
            tokenService.post('contentResponse/'+ $scope.eventId, {'response_text':data}).then(function(result){
                console.log(result);
                //$scope.newComment = "";

            });
        };
        //check if its the commenet made by the current user
        $scope.isCommentEditable = function(comment) {
            return (comment.username == $rootScope.user.username);
        };

        $scope.editComment = function(comment) {
            if ($scope.isCommentEditable(comment)) {
                $scope.commentInEditMode = true;
                $scope.CommentBeingEdited = comment;
                comment.isInEditMode = true;
            }
        };

        $scope.deleteComment = function(comment) {
            tokenService.delete('contentResponse/' + comment.content_response_id).then(function(result){
                var index = $scope.comments.indexOf(comment);
                $scope.comments.splice(index, 1);
                console.log(result);
            });

        };


        $scope.updateComment = function(comment) {
            tokenService.patch('contentResponse/' + comment.content_response_id, {'response_text':comment.response_text}).then(function(result){
            console.log(result);
            comment.isInEditMode = false;
            $scope.commentInEditMode = false;
            });
        };



    }
})();
