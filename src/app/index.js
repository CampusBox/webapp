'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngFileUpload', 'satellizer',
        'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'angular-medium-editor', 'socialLogin', 'ngStorage', 'satellizer', 'ngImgCrop', 'angular-jwt','infinite-scroll'
    ])
    //remove setellizer
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $authProvider,
        $mdIconProvider, socialProvider, jwtInterceptorProvider, jwtOptionsProvider, $httpProvider) {
        jwtOptionsProvider.config({
            whiteListedDomains: ['http://localhost','http://192.171.2.213'],
            unauthenticatedRedirectPath: '/login',
            authPrefix: 'MyPrefix ',
            tokenGetter: ['options', function(options) {

                if (options && options.url.substr(options.url.length - 5) == '.html') {
                    return null;
                }
                var token = localStorage.getItem('id_token');
                // console.log(localStorage.getItem('id_token'));
                return token;
            }],
        });
        $httpProvider.interceptors.push('jwtInterceptor');
      
        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'app/views/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                abstract: true,
                data: {
                    requiresLogin: true
                }
            })
            .state('static', {
                url: '',
                templateUrl: 'app/views/static.html',
                controller: 'StaticController',
                controllerAs: 'vm',
                abstract: true
            })
            .state('home.myProfile', {
                url: '/myProfile/:tab',
                templateUrl: 'app/views/home/myProfile.html',
                controller: 'MyProfileController',
                controllerAs: 'vm',
                data: {
                    title: 'My Profile'
                }
            })
            .state('static.login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'app/views/static/login.html',
                data: {
                    title: 'Dashboard'
                }
            })
            .state('static.signUp', {
                url: '/signup',
                controller: 'SignUpController',
                templateUrl: 'app/views/static/signUp.html',
                data: {
                    title: 'Dashboard'
                }
            })

        .state('home.dashboard', {
                url: '/dashboard',
                controler: 'DashboardController',
                templateUrl: 'app/views/home/dashboard.html',
                data: {
                    requiresLogin: true,
                    title: 'Dashboard'
                }
            })
            .state('home.search', {
                url: '/search',
                controler: 'SearchController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home/search.html',
                data: {
                    requiresLogin: true,
                    title: 'Dashboard'
                }
            })
            .state('home.table', {
                url: '/table',
                controller: 'TableController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home/table.html',
                data: {
                    title: 'Table'
                }
            })
            .state('home.profile', {
                url: '/profile/:studentId',
                templateUrl: 'app/views/home/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Profile'
                }
            })



        .state('home.events', {
                url: '/events',
                templateUrl: 'app/views/home/events.html',
                controller: 'EventsController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Profile'
                }
            })
        .state('home.eventFullPage', {
                url: '/eventFullPage',
                templateUrl: 'app/views/home/eventFullPage.html',
                controller: 'EventFullPageController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Event'
                }
            })
            .state('home.myEvents', {
                url: '/myEvents',
                templateUrl: 'app/views/home/myEvents.html',
                controller: 'EventsController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'My Events'
                }
            })

        .state('home.blogs', {
                url: '/blogs',
                templateUrl: 'app/views/home/blogs.html',
                controller: 'BlogsController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Profile'
                }
            })
            .state('home.myBlogs', {
                url: '/myBlogs',
                templateUrl: 'app/views/home/myBlogs.html',
                controller: 'BlogsController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'My Blogs'
                }
            })
            .state('home.addBlog', {
                url: '/addBlog',
                templateUrl: 'app/views/home/addBlog.html',
                controller: 'AddBlogController',
                controllerAs: 'vm',
                data: {
                    title: 'Add a Post'
                }
            })
            .state('home.addImages', {
                url: '/addImages',
                templateUrl: 'app/views/home/addImages.html',
                controller: 'AddBlogController',
                controllerAs: 'vm',
                data: {
                    title: 'Add Pictures'
                }
            })
            .state('home.societies', {
                url: '/societies',
                templateUrl: 'app/views/home/societies.html',
                controller: 'SocietiesController',
                controllerAs: 'vm',
                data: {
                    title: 'Profile'
                }
            });

        // $authProvider.facebook({
        //     clientId: '1250377088376164'
        // });
$authProvider.httpInterceptor = false;
        // Optional: For client-side use (Implicit Grant), set responseType to 'token' (default: 'code')
        $authProvider.facebook({
            clientId: '1250377088376164',
            url:"http://localhost/app/public/facebook",
             responseType: 'token'
        });

        $authProvider.google({
            clientId: '702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com',
            url: '',
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth'
        });

        // $authProvider.github({
        //     clientId: 'GitHub Client ID'
        // });

        $authProvider.linkedin({
             clientId: '81l3qatlqe4l4p',
             redirectUri: "http://localhost:8000",
             url: 'http://localhost:8000'
         });

        // $authProvider.instagram({
        //     clientId: 'Instagram Client ID'
        // });

        // $authProvider.yahoo({
        //     clientId: 'Yahoo Client ID / Consumer Key'
        // });

        // $authProvider.live({
        //     clientId: 'Microsoft Client ID'
        // });

        // $authProvider.twitch({
        //     clientId: 'Twitch Client ID'
        // });

        // $authProvider.bitbucket({
        //     clientId: 'Bitbucket Client ID'
        // });

        // $authProvider.spotify({
        //     clientId: 'Spotify Client ID'
        // });

        // // No additional setup required for Twitter

        // $authProvider.oauth2({
        //     name: 'foursquare',
        //     url: '/auth/foursquare',
        //     clientId: 'Foursquare Client ID',
        //     redirectUri: window.location.origin,
        //     authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
        // });
        $urlRouterProvider.otherwise('/login');
        socialProvider.setGoogleKey("702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com");
        socialProvider.setLinkedInKey("81l3qatlqe4l4p");
        socialProvider.setFbKey({ appId: "1250377088376164", apiVersion: "v2.8", responseType: 'token' });

        $mdIconProvider
            .defaultIconSet('assets/svg/mdi.svg');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('light-blue', {
                'default': '600'
            })
            .accentPalette('blue', {
                'default': '500'
            })
            .warnPalette('blue');

        $mdThemingProvider.theme('dark', 'default')
            .primaryPalette('light-blue')
            .dark('blue');

        $mdThemingProvider.theme('light-blue', 'default')
            .primaryPalette('light-blue');


    })
    .run(function(authManager) {

       // authManager.checkAuthOnRefresh();
       // console.log(authManager.isAuthenticated);
        // authManager.redirectWhenUnauthenticated();
    });
// .run(["$rootScope", "$state", "$location", "$stateParams", "$timeout", "$localStorage", function($rootScope, $state, $location, $stateParams, $timeout, $localStorage) {
//     $rootScope.$on("$stateChangeStart", function(event, next) {
//         console.log($location.path());
//         console.log($localStorage.authenticated);
//             console.log($state.current.name);

//         if ($localStorage.authenticated != true && $location.path() != '/login') {
//             console.log('Not logged in.');

//             $state.go('static.login');

//         } else if ($localStorage.authenticated == true && $state.current.name == 'static.login') {
//             console.log('Already logged in.');
//             event.preventDefault();
//             $state.go('home.profile')
//             return;

//         } 
//     });
// }])

;
