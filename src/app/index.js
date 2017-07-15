'use strict';

angular.module('angularMaterialAdmin', ['app'])
    //remove setellizer
    .config(function(AnalyticsProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $authProvider, $locationProvider,
        $mdIconProvider, socialProvider, $httpProvider, $mdDateLocaleProvider, $mdAriaProvider, $compileProvider) {

        //UU-XXXXXXX-X should be your tracking code
        AnalyticsProvider.setAccount('UA-57016004-2');

        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD-MMM-YY');
        };
        $mdAriaProvider.disableWarnings();

        /*
        Uncomment before buidling for pushing to server 
         */

        $compileProvider.debugInfoEnabled(false);
        $compileProvider.commentDirectivesEnabled(false);
        $compileProvider.cssClassDirectivesEnabled(false);
        // $locationProvider.html5Mode(true);

        $authProvider.httpInterceptor = false;
        // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
        $authProvider.facebook({
            clientId: '1250377088376164',
            url: "http://localhost/app/public/facebook",
            responseType: 'token',
            authorizationEndpoint: 'https://www.facebook.com/v2.8/dialog/oauth',
            scope: ['user_about_me', 'read_custom_friendlists', 'user_friends', 'email', 'user_hometown', 'user_likes']
        });

        $authProvider.google({
            url: "http://localhost/app/public/login",
            clientId: '702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth'
        });
        // $authProvider.linkedin({
        //     clientId: '81l3qatlqe4l4p',
        // });
        $urlRouterProvider.otherwise('/creativity');
        socialProvider.setGoogleKey("702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com");
        // socialProvider.setLinkedInKey("81l3qatlqe4l4p");
        socialProvider.setFbKey({ appId: "1250377088376164", apiVersion: "v2.8", responseType: 'token' });

        $mdIconProvider
            .defaultIconSet('assets/svg/mdi.svg');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('pink', {
                'default': '600'
            })
            .accentPalette('pink', {
                'default': '500'
            })
            .warnPalette('red');

        $mdThemingProvider.theme('dark', 'default')
            .primaryPalette('pink')
            .dark('pink');

        $mdThemingProvider.theme('pink', 'default')
            .primaryPalette('pink');


    })
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