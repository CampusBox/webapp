(function() {
    'use strict';

    angular.module('app')
        .service('creativityActionsService', [
            '$rootScope',
            'tokenService',
            function($rootScope, tokenService) {
                var obj = {};

                obj.heart = function(content) {
                    if ($rootScope.authenticated) {
                        content.Actions.Appreciate.status = !content.Actions.Appreciate.status;
                        if (content.Actions.Appreciate.status) {
                            content.Actions.Appreciate.total += 1;
                            tokenService.post('appreciateContent/' + content.id).then(function(result) {
                                console.log('post request');
                                if (result.status != 'error') {
                                    console.log(result.status);
                                    // return content;
                                } else {
                                    console.log(result);
                                }
                            });
                        } else {
                            content.Actions.Appreciate.total -= 1;

                            tokenService.delete('appreciateContent/' + content.id, '').then(function(result) {
                                console.log('delete request');
                                if (result.status != 'error') {
                                    console.log(result.status);
                                    // return content;
                                } else {
                                    console.log(result);
                                }
                            });
                        }
                    } else {
                        $rootScope.openLoginDialog(function() {
                            obj.heart(content, $index);
                        });
                    }
                }
                obj.bookmark = function(content) {
                    if ($rootScope.authenticated) {
                        content.Actions.Bookmarked.status = !content.Actions.Bookmarked.status;
                        if (content.Actions.Bookmarked.status) {
                            content.Actions.Bookmarked.total += 1;
                            tokenService.post('bookmarkContent/' + content.id).then(function(result) {
                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        } else {
                            content.Actions.Bookmarked.total -= 1;
                            tokenService.delete('bookmarkContent/' + content.id, '').then(function(result) {
                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        }
                    } else {
                        $rootScope.openLoginDialog(function() {
                            obj.bookmark(content, index);
                        });
                    }
                }
                return obj;
            }
        ]);
})();
