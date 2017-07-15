'use strict';

angular.module('run', ['ui.router'])

.run(function($state, $location, $rootScope, $mdDialog, tokenService, Analytics) {
    // authManager.checkAuthOnRefresh();
    //   authManager.redirectWhenUnauthenticated();
    console.log('abc');

    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
            $rootScope.currentState = toState.name;
        });
    localStorage.setItem('evervisited', true);

    $rootScope.user = {};

    // REQUIRED FOR CORDOVA
    // 
    // angular.element(document).ready(function() {

    //     console.log("Testing if cordova is passed");

    //     if (window.cordova) {

    //         console.log("Cordova passed!")

    //         document.addEventListener('deviceready', function() {
    //             console.log("Deviceready event has fired, bootstrapping AngularJS.");
    //             // Link the callback function to universalLinks
    //             universalLinks.subscribe(null, function(eventData) {
    //                 // do some work
    //                 console.log('Did launch application from the link: ' + eventData.url);
    //                 var url = eventData.url;
    //                 var n = url.indexOf('campusbox.org/dist');
    //                 var result = url.substring(n + 19);
    //                 // eventData.url = null;

    //                 console.log(result);
    //                 $location.url(result);

    //             });
    //         }, false);
    //     }
    // });
    // 
    // END


    $rootScope.currentState = $state.current.name;
    $rootScope.$on('$stateChangeSuccess', function() {
        $rootScope.currentState = $state.current.name;
        //If you don't wanna create the service, you can directly write
        // your function here.
        // someService.doSomething();
    });
    $rootScope.openLoginDialog = function(callback) {
        $mdDialog.show({
            controller: 'loginDialogController',
            templateUrl: 'app/dialogs/auth/loginDialog.html',
            parent: angular.element(document.body),
            escapeToClose: true,
            fullscreen: true,
            clickOutsideToClose: true,
            controllerAs: 'dc'
        }).then(function() {
            callback();
        }, function() {
            // console.log('else of dialog');
        });
    };

    $rootScope.token = localStorage.getItem('id_token');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').then(function() {
                //Registration was successful
            })
            .catch(function() {
                //registration failed :(
            });
    }
    if (localStorage.getItem('id_token') !== null) {
        $rootScope.authenticated = true;
        $rootScope.token = localStorage.getItem('id_token');

        tokenService.get("userImage")
            .then(function(response) {
                $rootScope.user = response;
                tokenService.get("notifications")
                    .then(function(abc) {
                        $rootScope.notifications = abc;
                    });
            });
    } else {
        $rootScope.authenticated = false;

    }
    //  if (!authManager.isAuthenticated()) {
    //        console.log("sending to login")
    //      $state.go('static.login');

    //}
});