(function() {
    'use strict';

    angular.module('app')
        .service('creativityActionsService', [
            '$rootScope',
            'tokenService',
            function($rootScope, tokenService) {
                var obj = this;

                obj.heart = function(content) {
                    console.log(content);
                    if ($rootScope.authenticated) {
                        content.actions.appreciate.status = !content.actions.appreciate.status;
                        if (content.actions.appreciate.status) {
                            content.actions.appreciate.total += 1;
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
                            content.actions.appreciate.total -= 1;

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
                        content.actions.bookmarks.status = !content.actions.bookmarks.status;
                        if (content.actions.bookmarks.status) {
                            content.actions.bookmarks.total += 1;
                            tokenService.post('bookmarkContent/' + content.id).then(function(result) {
                                if (result.status != 'error') {
                                    console.log(result.status);
                                } else {
                                    console.log(result);
                                }
                            });
                        } else {
                            content.actions.bookmarks.total -= 1;
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
