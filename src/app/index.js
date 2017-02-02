'use strict';

angular.module('angularMaterialAdmin', ['ngAnimate', 'ngCookies', 'ngFileUpload',
    'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'angular-medium-editor'
])

.config(function($stateProvider, $urlRouterProvider, $mdThemingProvider,
    $mdIconProvider) {
    $stateProvider
        .state('home', {
            url: '',
            templateUrl: 'app/views/main.html',
            controller: 'MainController',
            controllerAs: 'vm',
            abstract: true
        })
        .state('home.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/views/dashboard.html',
            data: {
                title: 'Dashboard'
            }
        })
        .state('home.profile', {
            url: '/profile',
            templateUrl: 'app/views/profile.html',
            controller: 'ProfileController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
            }
        })
        .state('home.events', {
            url: '/events',
            templateUrl: 'app/views/events.html',
            controller: 'EventsController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
            }
        })
        .state('home.myEvents', {
            url: '/myEvents',
            templateUrl: 'app/views/myEvents.html',
            controller: 'EventsController',
            controllerAs: 'vm',
            data: {
                title: 'My Events'
            }
        })
        .state('home.myBlogs', {
            url: '/myBlogs',
            templateUrl: 'app/views/myBlogs.html',
            controller: 'BlogsController',
            controllerAs: 'vm',
            data: {
                title: 'My Blogs'
            }
        })
        .state('home.addBlog', {
            url: '/addBlog',
            templateUrl: 'app/views/addBlog.html',
            controller: 'AddBlogController',
            controllerAs: 'vm',
            data: {
                title: 'Add a Post'
            }
        })
        .state('home.societies', {
            url: '/societies',
            templateUrl: 'app/views/societies.html',
            controller: 'SocietiesController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
            }
        })
        .state('home.blogs', {
            url: '/blogs',
            templateUrl: 'app/views/blogs.html',
            controller: 'BlogsController',
            controllerAs: 'vm',
            data: {
                title: 'Profile'
            }
        })
        .state('home.search', {
            url: '/search',
            templateUrl: 'app/views/search.html',
            data: {
                title: 'Dashboard'
            }
        })
        .state('home.table', {
            url: '/table',
            controller: 'TableController',
            controllerAs: 'vm',
            templateUrl: 'app/views/table.html',
            data: {
                title: 'Table'
            }
        });

    $urlRouterProvider.otherwise('/dashboard');

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


});
