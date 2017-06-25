(function() {


    angular
        .module('app')
        .controller('MyProfileController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$stateParams',
            '$state',
            '$rootScope',
            '$mdMedia',
            MyProfileController
        ]);

    function MyProfileController($mdDialog, $scope, tokenService, $stateParams, $state, $rootScope, $mdMedia) {
        var vm = this;
        $scope.editAbout = false;
        $scope.loading = true;
        $scope.BookmarkedContents = [];
        $scope.CreativeContents = [];
        $scope.studentAbout = {};
        $scope.studentLoading = true;
        $rootScope.currentPageBackground = '#fff';
        $rootScope.title = "My Profile";
        $scope.currentNavItem = 'creativity';
        //detect screen size
        $scope.screenIsSmall = $mdMedia('xs');

        console.log($scope.screenIsSmall);
        if ($stateParams.tab == "") {
            $scope.currentNavItem = "profile";
        } else {
            $scope.currentNavItem = $stateParams.tab;
        }
        $scope.goto = function(page) {
            $scope.currentNavItem = page;
        };
        tokenService.get("myProfile")
            .then(function(student) {
                $scope.student = student.data;
                $scope.studentLoading = false;
                $scope.studentAbout.about = student.data.subtitle;
                $scope.student.BookmarkedContents.data.forEach(function(content, index) {
                    $scope.student.BookmarkedContents.data[index].created_at = new Date(Date.parse($scope.student.BookmarkedContents.data[index].created_at.replace('-', '/', 'g'))); //replace mysql date to js date format
                });
                $scope.student.CreativeContents.data.forEach(function(content, index) {
                    $scope.student.CreativeContents.data[index].created_at = new Date(Date.parse($scope.student.CreativeContents.data[index].created_at.replace('-', '/', 'g'))); //replace mysql date to js date format
                });

                if (!$scope.screenIsSmall && $stateParams.tab === 'profile') {
                    $scope.currentNavItem = 'creativity';
                    //$scope.goto('creativity');
                } else if ($scope.currentNavItem == '' || $scope.currentNavItem == null) {
                    $scope.currentNavItem = 'profile';
                }
                if ($scope.currentNavItem === 'recomended' && $scope.student.BookmarkedContents.data == 0) {
                    $scope.currentNavItem = 'creativity';
                    //$scope.goto('creativity');
                }
                $scope.loading = false;
            });



        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'app/views/partials/completeProfile.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };
        $scope.cancelRsvp = function(ev, event, index) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Not attending ' + event.title + "?")
                .textContent('')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Not attending')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                tokenService.delete('rsvpEvent/' + event.id, '').then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                        $scope.student.AttendingEvents.data.splice(index, 1);
                    } else {
                        console.log(result);
                    }
                });
            }, function() {
                console.log('cancel');
            });
        };
        $scope.deleteContent = function(ev, content, index) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Delete ' + content.title + "?")
                .textContent('')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Yes')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                tokenService.delete('content/' + content.id).then(function(result) {
                    console.log(result);
                    if (result.status != 'error') {
                        console.log(result.status);
                        $scope.student.CreativeContents.data.splice(index, 1);
                    } else {
                        console.log(result);
                    }
                });
            }, function() {
                console.log('cancel');
            });
        };
        $scope.deleteEvent = function(ev, event, index) {
            var confirm = $mdDialog.confirm()
                .title('Delete ' + event.title + "?")
                .textContent('')
                .targetEvent(ev)
                .clickOutsideToClose(true)
                .ok('Yes')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
                tokenService.delete('events/' + event.id).then(function(result) {
                    console.log(result);
                    if (result.status != 'error') {
                        console.log(result.status);
                        $scope.student.Events.data.splice(index, 1);
                    } else {
                        console.log(result);
                    }
                });
            }, function() {
                console.log('cancel');
            });
        };


        $scope.unPublishAndMoveToDraft = function(content, index) {
            tokenService.delete('movetoDraftContent/' + content.id).then(function(result) {
                console.log(result);
                if (result.status != 'error') {
                    console.log(result.status);
                    $scope.student.CreativeContents.data.splice(index, 1);
                } else {
                    console.log(result);
                }
            });
        };

        //Uncomment this when draft system is made

        // $scope.eventSaveToDraft = function(event, index){
        //     tokenService.delete('movetoDraftEvent/' + event.id).then(function(result) {
        //             console.log(result);
        //             if (result.status != 'error') {
        //                 console.log(result.status);
        //                 $scope.student.Events.data.splice(index, 1);
        //             } else {
        //                 console.log(result);
        //             }
        //         });
        // };

        $scope.openMenu = function($mdMenu, ev) {
            $scope.originatorEv = ev;
            $mdMenu.open(ev);
        };

        $scope.showParticipants = function(ev, eventId) {
            $mdDialog.show({
                controller: 'ParticipantsController',
                templateUrl: 'app/views/partials/showParticipants.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    eventId: eventId

                },
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };
        $scope.edit = function() {
            // For profile details edit
        };
        $scope.about = function() {
            tokenService.patch("/students/" + $scope.student.username, $scope.studentAbout)
                .then(function() {
                    $scope.student.subtitle = $scope.studentAbout.about;
                })
                .catch(function(error) {
                    console.log(error);
                });
        };
        $scope.follow = function(type, index) {
            // SEND FOLLOWER ID AND FOLLOWING ID IN POST
            if ($scope.student[type].data[index].following) {
                tokenService.post('studentFollow/' + $scope.student[type].data[index].username).then(function(result) {
                    if (result.status != 'error') {
                        console.log(result.status);
                        $scope.student[type].data[index].following = !$scope.student[type].data[index].following;
                    } else {
                        console.log(result);
                    }
                });
            } else {
                // SEND FOLLOWER ID IN DELETE
                tokenService.delete('studentFollow/' + $scope.student[type].data[index].username).then(function(result) {
                    console.log('post request');
                    if (result.status != 'error') {
                        $scope.student[type].data[index].following = !$scope.student[type].data[index].following;
                        console.log(result.status);
                    } else {
                        console.log(result);
                    }
                });
            }
        };

        $scope.unBookmark = function(content, index) {
            console.log("unbookmark");
            tokenService.delete('bookmarkContent/' + content.id).then(function(result) {
                console.log(result);
                $scope.student.BookmarkedContents.data.splice(index, 1);
            }).catch(function(error) {
                console.log(error);
            });
        };

        $scope.unfollow = function(item, index) {
            console.log("unbookmark");
            tokenService.delete('studentFollow/' + item.username).then(function(result) {
                console.log(result);
                $scope.student.Following.data.splice(index, 1);
            }).catch(function(error) {
                console.log(error);
            });
        };

        // SKILLS CHIP SHIT STARTED

        $scope.editSkills = false;
        $scope.removable = false;
        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.add = {};
        $scope.add.skill = '';
        $scope.querySearch = querySearch;
        numberChips = [];
        numberChips2 = [];
        numberBuffer = '';
        $scope.autocompleteDemoRequireMatch = false;
        $scope.transformChip = transformChip;

        /**
         * Return the proper object when the append is called.
         */
        function transformChip(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return { name: chip };
        }

        /**
         * Search for vegetables.
         */
        function querySearch(query) {
            // var results = query ? vegetables.filter(createFilterFor(query)) : [];

            if (query) {
                arrayObjectIndexOf($scope.skills, query);
                results = $scope.skills.filter(arrayObjectIndexOf($scope.skills, query));
                // results = [];
                return results;
            } else {
                results = [];
                return results;
            }
        }

        function arrayObjectIndexOf(myArray, searchTerm) {
            console.log('myArray[i].name.match(searchTerm)');
            for (var i = 0, len = myArray.length; i < len; i++) {
                // if (myArray[i].name == searchTerm) {
                if (myArray[i].name.match(searchTerm) != null) {
                    return i;
                }
            }
            return -1;
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(vegetable) {
                return (vegetable.name.indexOf(lowercaseQuery) === 0)
            };

        }


        $scope.updateSkills = function() {

            $scope.newSkills = {};
            $scope.newSkills.skills = $scope.student.Skills.data;
            if ($scope.add.skill) {
                if ($scope.student.Skills.data.length <= 4)
                    $scope.newSkills.skills.push({ 'name': $scope.add.skill });
            } else {
                console.log("NULL SKILL");
                $scope.editSkills = false;
            }
            console.log($scope.add.skill);
            tokenService.post("addStudentSkills", $scope.newSkills)
                .then(function(status) {
                    console.log(status);
                    $scope.editSkills = false;
                    $scope.add.skill = null;
                }).catch(function(status) {
                    $scope.editSkills = false;
                    console.log(status);
                });


        };

        // SKILLS CHIP SHIT ENDED
        function SocialController() {}

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };
        }

    }

})();
