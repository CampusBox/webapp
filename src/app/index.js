'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngFileUpload',
    'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'angular-medium-editor', 'socialLogin', 'ngStorage'
])

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider,
    $mdIconProvider, socialProvider) {
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'app/views/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            abstract: true
        })
        .state('static', {
            url: '',
            templateUrl: 'app/views/static.html',
            controller: 'StaticController',
            controllerAs: 'vm',
            abstract: true
        })


    .state('static.login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/views/static/login.html',
        data: {
            title: 'Dashboard'
        }
    })

    .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/views/home/dashboard.html',
            data: {
                title: 'Dashboard'
            }
        })
        .state('home.search', {
            url: '/search',
            templateUrl: 'app/views/home/search.html',
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
            url: '/profile',
            templateUrl: 'app/views/home/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
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
        .state('home.myEvents', {
            url: '/myEvents',
            templateUrl: 'app/views/home/myEvents.html',
            controller: 'EventsController',
            controllerAs: 'vm',
            data: {
                title: 'My Events'
            }
        })

    .state('home.blogs', {
            url: '/blogs',
            templateUrl: 'app/views/home/blogs.html',
            controller: 'BlogsController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
            }
        })
        .state('home.myBlogs', {
            url: '/myBlogs',
            templateUrl: 'app/views/home/myBlogs.html',
            controller: 'BlogsController',
            controllerAs: 'vm',
            data: {
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
        .state('home.societies', {
            url: '/societies',
            templateUrl: 'app/views/home/societies.html',
            controller: 'SocietiesController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
            }
        });

    // $urlRouterProvider.otherwise('/dashboard');
    socialProvider.setGoogleKey("702228530885-vi264d7g6v5ivbcmebjfpomr0hmliomd.apps.googleusercontent.com");
    socialProvider.setLinkedInKey("81qzttym8fci2t");
    socialProvider.setFbKey({ appId: "1250377088376164", apiVersion: "v2.8" });

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

.run(["$rootScope", "$state", "$location", "$stateParams", "$timeout", "$localStorage", function($rootScope, $state, $location, $stateParams, $timeout, $localStorage) {
    $rootScope.$on("$stateChangeStart", function(event, next) {
        console.log($location.path());

        if (!$localStorage.authenticated && $location.path() != '/login') {
            console.log('not');
            // e.preventDefault();
            event.preventDefault();
            $state.go('static.login', next, { location: 'replace' })

            // $state.go('login');
            //     // $location.path('/newValue')

        } else if ($localStorage.authenticated && $location.path() == '/login') {
            //  toastr.success('Welcome!');
            $rootScope.authenticated = true;
            $rootScope.roll = $localStorage.roll;
            $rootScope.name = $localStorage.name;
            $rootScope.gender = $localStorage.gender;
            $rootScope.hostel = $localStorage.hostel;
            $rootScope.batch_code = $localStorage.batch_code;
            $rootScope.branch = $localStorage.branch;
            $rootScope.year = $localStorage.year;
            $rootScope.room = $localStorage.room;
            $rootScope.url = $localStorage.url;

            console.log('yes');
            event.preventDefault();
            $state.go('home.profile')
                // $state.go('login');
    return;

        } else {

            $rootScope.authenticated = true;
            $rootScope.roll = $localStorage.roll;
            $rootScope.name = $localStorage.name;
            $rootScope.gender = $localStorage.gender;
            $rootScope.hostel = $localStorage.hostel;
            $rootScope.batch_code = $localStorage.batch_code;
            $rootScope.branch = $localStorage.branch;
            $rootScope.year = $localStorage.year;
            $rootScope.room = $localStorage.room;
            $rootScope.url = $localStorage.url;

        }
    });
}]);
