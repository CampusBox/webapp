'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngFileUpload', 'satellizer',
        'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'angular-medium-editor', 'socialLogin', 'ngStorage', 'satellizer', 'ngImgCrop', 'angular-jwt', 'infinite-scroll',
    ])
    //remove setellizer
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $authProvider,
        $mdIconProvider, socialProvider, jwtInterceptorProvider, jwtOptionsProvider, $httpProvider, $mdDateLocaleProvider, $mdAriaProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD-MMM-YY');
        };
        $mdAriaProvider.disableWarnings();

        jwtOptionsProvider.config({
            whiteListedDomains: ['http://localhost', 'http://192.171.2.213', 'http://campusbox.org'],
            unauthenticatedRedirectPath: '/login',
            unauthenticatedRedirector: ['$state', function($state) {
                $state.go('static.login');
            }],
            tokenGetter: ['options', 'jwtHelper', function(options, jwtHelper) {
                if (options && options.url.substr(options.url.length - 5) == '.html') {
                    return null;
                }
                var token = localStorage.getItem('id_token');
                if (token) {
                    if (token != "undefined") {
                        if (!jwtHelper.isTokenExpired(token)) {
                            return localStorage.getItem('id_token');
                        } else {
                            localStorage.removeItem('id_token');
                        }
                    } else
                        localStorage.removeItem('id_token');
                }
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
            .state('home.addEvent', {
                url: '/addEvent',
                templateUrl: 'app/views/home/addEvent.html',
                controller: 'AddEventController',
                controllerAs: 'vm',
                data: {
                    title: 'My Profile'
                }
            })
            .state('home.singleEvent', {
                url: '/singleEvent/:eventId',
                templateUrl: 'app/views/home/singleEvent.html',
                controller: 'SingleEventController',
                controllerAs: 'vm',
                data: {
                    title: 'Event'
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
            .state('home.searchEvents', {
                url: '/search/events/:query',
                controler: 'SearchEventsController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home/searchEvents.html',
                data: {
                    requiresLogin: true,
                    title: 'Dashboard'
                }
            })
            .state('home.searchCreativity', {
                url: '/search/creativity/:query',
                controler: 'SearchCreativityController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home/searchCreativity.html',
                data: {
                    requiresLogin: true,
                    title: 'Dashboard'
                }
            })
            .state('home.searchStudents', {
                url: '/search/students/:query',
                controler: 'SearchStudentsController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home/searchStudents.html',
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
                url: '/profile/:username',
                templateUrl: 'app/views/home/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Profile'
                }
            })
            .state('home.singleContent', {
                url: '/singleContent/:contentId',
                templateUrl: 'app/views/home/singleCreativtiy.html',
                controller: 'SingleContentController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Content'
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
                controller: 'MyProfileController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'My Events'
                }
            })

        .state('home.blogs', {
                url: '/blogs',
                templateUrl: 'app/views/home/creativity.html',
                controller: 'BlogsController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Profile'
                }
            })
           
            .state('home.addBlog', {
                url: '/addBlog',
                templateUrl: 'app/views/home/addCreativity.html',
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
        $authProvider.linkedin({
            clientId: '81l3qatlqe4l4p',
        });
        $urlRouterProvider.otherwise('/signup');
        socialProvider.setGoogleKey("702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com");
        socialProvider.setLinkedInKey("81l3qatlqe4l4p");
        socialProvider.setFbKey({ appId: "1250377088376164", apiVersion: "v2.8", responseType: 'token' });

        $mdIconProvider
            .defaultIconSet('assets/svg/mdi.svg');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue', {
                'default': '600'
            })
            .accentPalette('blue', {
                'default': '500'
            })
            .warnPalette('blue');

        $mdThemingProvider.theme('dark', 'default')
            .primaryPalette('blue')
            .dark('blue');

        $mdThemingProvider.theme('blue', 'default')
            .primaryPalette('blue');


    })
    .run(function(authManager, $state, $location, $rootScope) {
        // authManager.checkAuthOnRefresh();
        //   authManager.redirectWhenUnauthenticated();
        $rootScope.token = localStorage.getItem('id_token');
        if ('serviceWorker' in navigator) {
            // navigator.serviceWorker.register('/service-worker.js', { scope: './'}).then(function(registration) {
            //     console.log('Service Worker registered');
            // }).catch(function(err) {
            //     console.log('Service Worker registration failed: ', err);
            // });
        } else {
            console.log("this browser does NOT support service worker");
        }
        //  if (!authManager.isAuthenticated()) {
        //        console.log("sending to login")
        //      $state.go('static.login');

        //}
    });
