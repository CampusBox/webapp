'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngFileUpload', 'satellizer',
        'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'angular-medium-editor', 'socialLogin', 'ngStorage', 'satellizer', 'ngImgCrop', 'angular-jwt', 'infinite-scroll'
    ])
    //remove setellizer
    .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $authProvider, $locationProvider,
        $mdIconProvider, socialProvider, jwtInterceptorProvider, jwtOptionsProvider, $httpProvider, $mdDateLocaleProvider, $mdAriaProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('DD-MMM-YY');
        };
        $mdAriaProvider.disableWarnings();
        // $locationProvider.html5Mode(true);

        jwtOptionsProvider.config({
            whiteListedDomains: ['http://localhost', 'http://192.171.2.213', 'http://campusbox.org'],
            unauthenticatedRedirectPath: '/signUp',
            unauthenticatedRedirector: ['$state', function($state) {
                $state.go('static.signUp');
                // $rootScope.openLoginDialog();
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
                data: {}
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
                    requiresLogin: true,
                    title: 'My Profile'
                }
            })
            .state('home.addEvent', {
                url: '/addEvent',
                templateUrl: 'app/views/home/addEvent.html',
                controller: 'AddEventController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,

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
                    title: 'Dashboard'
                }
            })
            .state('home.searchEvents', {
                url: '/search/events/:query',
                controler: 'SearchEventsController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home/searchEvents.html',
                data: {
                    title: 'Dashboard'
                }
            })
            .state('home.searchCreativity', {
                url: '/search/creativity/:query',
                controler: 'SearchCreativityController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home/searchCreativity.html',
                data: {
                    title: 'Dashboard'
                }
            })
            .state('home.searchStudents', {
                url: '/search/students/:query',
                controler: 'SearchStudentsController',
                controllerAs: 'vm',
                templateUrl: 'app/views/home/searchStudents.html',
                data: {
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
                    title: 'Profile'
                }
            })
            .state('home.singleContent', {
                url: '/singleContent/:contentId',
                templateUrl: 'app/views/home/singleCreativity.html',
                controller: 'SingleContentController',
                controllerAs: 'vm',
                data: {
                    title: 'Content'
                }
            })
            .state('home.events', {
                url: '/events',
                templateUrl: 'app/views/home/events.html',
                controller: 'EventsController',
                controllerAs: 'vm',
                data: {
                    title: 'Profile'
                }
            })
            .state('home.me', {
                url: '/me',
                templateUrl: 'app/views/home/me.html',
                controller: 'MeController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Me'
                }
            })
            .state('home.eventFullPage', {
                url: '/eventFullPage',
                templateUrl: 'app/views/home/eventFullPage.html',
                controller: 'EventFullPageController',
                controllerAs: 'vm',
                data: {
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
                    title: 'My Opportunities'
                }
            })

        .state('home.creativity', {
            url: '/creativity',
            templateUrl: 'app/views/home/creativity.html',
            controller: 'CreativityController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
            }
        })

        .state('home.addCreativity', {
                url: '/addCreativity',
                templateUrl: 'app/views/home/addCreativity.html',
                controller: 'AddCreativityController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'Add a Post'
                }
            })
            .state('home.addImages', {
                url: '/addImages',
                templateUrl: 'app/views/home/addImages.html',
                controller: 'AddCreativityController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,

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
        // $authProvider.linkedin({
        //     clientId: '81l3qatlqe4l4p',
        // });
        $urlRouterProvider.otherwise('/dashboard');
        socialProvider.setGoogleKey("702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com");
        // socialProvider.setLinkedInKey("81l3qatlqe4l4p");
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
            .warnPalette('red');

        $mdThemingProvider.theme('dark', 'default')
            .primaryPalette('blue')
            .dark('blue');

        $mdThemingProvider.theme('blue', 'default')
            .primaryPalette('blue');


    })
    .run(function(authManager, $state, $location, $rootScope, $mdDialog, tokenService) {
        // authManager.checkAuthOnRefresh();
        //   authManager.redirectWhenUnauthenticated();
        $rootScope.currentState = $state.current.name;
        console.log($rootScope.currentState);
        console.log($rootScope.currentState);
        $rootScope.$on('$stateChangeSuccess', function() {
            console.log($rootScope.currentState);
            $rootScope.currentState = $state.current.name;
            //If you don't wanna create the service, you can directly write
            // your function here.
            // someService.doSomething();
        });
        $rootScope.openLoginDialog = function(callback) {
            $mdDialog.show({
                controller: 'loginDialogController',
                templateUrl: 'app/views/partials/loginDialog.html',
                parent: angular.element(document.body),
                escapeToClose: true,
                fullscreen: true,
                clickOutsideToClose: true,
                controllerAs: 'dc'
            }).then(function() {
                callback();
            }, function() {
                console.log('else of dialog');
            });
        }

        $rootScope.token = localStorage.getItem('id_token');
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js').then(function(registration) {
                //Registration was successful
            }).catch(function(err) {
                //registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        }
        if (localStorage.getItem('id_token') != null) {
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
            $state.go('home.dashboard');
        }
        //  if (!authManager.isAuthenticated()) {
        //        console.log("sending to login")
        //      $state.go('static.login');

        //}
    });
