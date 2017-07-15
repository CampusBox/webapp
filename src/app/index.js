'use strict';

angular.module('angularMaterialAdmin', ['router', 'app'])
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


    });