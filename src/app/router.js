'use strict';

angular.module('router', ['ui.router'])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('home', {
                url: '',
                templateUrl: 'app/pages/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm',
                abstract: true,
                data: {}
            })
            .state('static', {
                url: '',
                templateUrl: 'app/pages/main/static.html',
                controller: 'StaticController',
                controllerAs: 'vm',
                abstract: true
            })
            .state('home.myProfile', {
                url: '/myProfile/:tab',
                templateUrl: 'app/pages/student/my/myProfile.html',
                controller: 'MyProfileController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,
                    title: 'My Profile'
                }
            })
            .state('home.addEvent', {
                url: '/addEvent',
                templateUrl: 'app/pages/events/add/addEvent.html',
                controller: 'AddEventController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: true,

                    title: 'Add new event'
                }
            })
            .state('home.singleEvent', {
                url: '/singleEvent/:eventId',
                templateUrl: 'app/pages/events/single/singleEvent.html',
                controller: 'SingleEventController',
                controllerAs: 'vm',
                data: {
                    requiresLogin: false,
                    title: 'Event'
                }
            })
            .state('static.login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'app/pages/static/login.html',

            })
            .state('static.signUp', {
                url: '/signup',
                controller: 'SignUpController',
                templateUrl: 'app/pages/static/signUp.html',

            })

        .state('home.dashboard', {
                url: '/dashboard',
                controller: 'DashboardController',
                templateUrl: 'app/pages/dashboard/dashboard.html',

            })
            .state('home.dashboardFromStatic', {
                url: '/dashboard/:onboard',
                controller: 'DashboardController',
                templateUrl: 'app/pages/dashboard/dashboard.html',

            })
            .state('home.searchEvents', {
                url: '/search/events/:query',
                controller: 'SearchEventsController',
                controllerAs: 'vm',
                templateUrl: 'app/pages/search/searchEvents.html',

            })
            .state('home.searchCreativity', {
                url: '/search/creativity/:query',
                controller: 'SearchCreativityController',
                controllerAs: 'vm',
                templateUrl: 'app/pages/search/searchCreativity.html',

            })
            .state('home.searchStudents', {
                url: '/search/students/:query',
                controller: 'SearchStudentsController',
                controllerAs: 'vm',
                templateUrl: 'app/pages/search/searchStudents.html',

            })
            .state('home.searchAll', {
                url: '/search/:query',
                controller: 'SearchAllController',
                controllerAs: 'vm',
                templateUrl: 'app/pages/search/searchAll.html',

            })
            .state('home.profile', {
                url: '/profile/:username',
                templateUrl: 'app/pages/student/single/profile.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                data: {
                    title: 'Profile'
                }
            })
            .state('home.singleContent', {
                url: '/singleContent/:contentId',
                templateUrl: 'app/pages/creativity/single/singleCreativity.html',
                controller: 'SingleContentController',
                controllerAs: 'vm',
                data: {
                    title: 'Content'
                }
            })
            .state('home.events', {
                url: '/events',
                templateUrl: 'app/pages/events/list/events.html',
                controller: 'EventsController',
                controllerAs: 'vm',
                data: {
                    title: 'Profile'
                }
            })
            .state('home.creativity', {
                url: '/creativity',
                templateUrl: 'app/pages/creativity/list/creativity.html',
                controller: 'CreativityController',
                controllerAs: 'vm',
                data: {
                    title: 'Profile'
                }
            })

        .state('home.addCreativity', {
            url: '/addCreativity',
            templateUrl: 'app/pages/creativity/add/addCreativity.html',
            controller: 'AddCreativityController',
            controllerAs: 'vm',
            data: {
                requiresLogin: true,
                title: 'Add a Post'
            }
        });
    }]);