(function() {

    angular
        .module('app')
        .controller('MyProfileController', [
            '$mdDialog',
            '$scope',
            'tokenService',
            '$stateParams',
            '$state',
            MyProfileController
        ]);

    function MyProfileController($mdDialog, $scope, tokenService, $stateParams, $state) {
        var vm = this;
        $scope.tab = $stateParams.tab;
        $scope.username = $stateParams.username;
        $scope.editAbout = false;
        $scope.BookmarkedContents = [];
        $scope.CreativeContents = [];
        console.log('my profile called' + $scope.username + $scope.tab);

        tokenService.get("myProfile")
            .then(function(student) {
                $scope.student = student.data;
                console.log($scope.student);
                $scope.myProfile.BookmarkedContents.data.forEach(function(content) {
                    cardObject = {}
                    $scope.loading == false;
                    cardObject.Actions = content.Actions;
                    cardObject.Tags = content.Tags;
                    cardObject.created = content.created;
                    cardObject.created.at = Date.parse(cardObject.created.at.replace('-', '/', 'g')); //replace mysql date to js date format
                    cardObject.id = content.id;
                    cardObject.title = $sce.trustAsHtml(content.title);
                    cardObject.links = content.links;
                    cardObject.total = content.links;
                    content.Items.data.forEach(function(item) {
                        if (item.type == 'text') {
                            cardObject.description = $filter('limitTo')(item.description, 110, 0)
                            cardObject.description = $sce.trustAsHtml(cardObject.description);
                        } else if ((item.type == 'cover' && !cardObject.type)) {
                            cardObject.type = item.type;
                            cardObject.url = item.image;
                        } else if ((item.type == 'youtube' || item.type == 'soundcloud' || item.type == 'vimeo') && !cardObject.type) {
                            cardObject.type = item.type;
                            cardObject.url = $sce.trustAsResourceUrl(item.embed.url);
                        } else if (((item.type == 'cover') || (item.type == 'image')) && !cardObject.type) {
                            cardObject.type = item.type;
                            cardObject.url = item.image;
                        }
                    });
                    $scope.BookmarkedContents.push(cardObject);
                    content = {};
                    $scope.loading = false;
                });
                $scope.myProfile.CreativeContents.data.forEach(function(content) {
                    cardObject = {}
                    $scope.loading == false;
                    cardObject.Actions = content.Actions;
                    cardObject.Tags = content.Tags;
                    cardObject.created = content.created;
                    cardObject.created.at = Date.parse(cardObject.created.at.replace('-', '/', 'g')); //replace mysql date to js date format
                    cardObject.id = content.id;
                    cardObject.title = $sce.trustAsHtml(content.title);
                    cardObject.links = content.links;
                    cardObject.total = content.links;
                    content.Items.data.forEach(function(item) {
                        if (item.type == 'text') {
                            cardObject.description = $filter('limitTo')(item.description, 110, 0)
                            cardObject.description = $sce.trustAsHtml(cardObject.description);
                        } else if ((item.type == 'cover' && !cardObject.type)) {
                            cardObject.type = item.type;
                            cardObject.url = item.image;
                        } else if ((item.type == 'youtube' || item.type == 'soundcloud' || item.type == 'vimeo') && !cardObject.type) {
                            cardObject.type = item.type;
                            cardObject.url = $sce.trustAsResourceUrl(item.embed.url);
                        } else if (((item.type == 'cover') || (item.type == 'image')) && !cardObject.type) {
                            cardObject.type = item.type;
                            cardObject.url = item.image;
                        }
                    });
                    $scope.CreativeContents.push(cardObject);
                    content = {};
                    $scope.loading = false;
                });
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
        $scope.openSocialAccounts = function(ev) {
            $mdDialog.show({
                controller: SocialController,
                templateUrl: 'app/views/partials/socialLinks.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };
        $scope.showParticipants = function(ev) {
            $mdDialog.show({
                controller: 'ParticipantsController',
                templateUrl: 'app/views/partials/showParticipants.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    participants: $scope.events
                },
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
        };
        $scope.deactivate = function(student) {

        };
        $scope.about = function() {
            if ($scope.editAbout) {
                tokenService.post("about", $scope.student.subtitle)
                    .then(function(abc) {
                        $scope.editAbout = false;
                    }).catch(function(error) {
                        console.log(error);
                    });
            } else {
                $scope.editAbout = true;
            }
        }
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
            }
            // SKILLS CHIP SHIT STARTED
        tokenService.get("skills")
            .then(function(tableData) {
                $scope.skills = tableData.data;
            });
        $scope.readonly = true;
        $scope.removable = false;
        $scope.selectedItem = null;
        $scope.searchText = null;
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
            return { name: chip }
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
                console.log();
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

        // function loadVegetables() {
        //     var veggies = [{
        //         'name': 'Broccoli'
        //     }, {
        //         'name': 'Cabbage'
        //     }, {
        //         'name': 'Carrot'
        //     }, {
        //         'name': 'Lettuce'
        //     }, {
        //         'name': 'Spinach'
        //     }];
        //     return veggies.map(function(veg) {
        //         veg._lowername = veg.name.toLowerCase();
        //         return veg;
        //     });
        // }
        $scope.skillsEdit = function() {
            if ($scope.readonly) {
                $scope.readonly = !$scope.readonly;
                $scope.removable = !$scope.removable;
            } else {
                console.log($scope.student.Skills);
                tokenService.post("addStudentSkills", $scope.student.Skills)
                    .then(function(abc) {
                        $scope.readonly = !$scope.readonly;
                        $scope.removable = !$scope.removable;
                    }).catch(function(error) {
                        console.log(error);
                    });
            }
        }

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
