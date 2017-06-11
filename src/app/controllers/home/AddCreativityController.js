'use strict';

(function() {

    angular
        .module('app')
        .controller('AddCreativityController', [
            '$scope',
            '$sce',
            '$timeout',
            '$mdDialog',
            'allDataService',
            'tokenService',
            '$state',
            '$rootScope',
            AddCreativityController
        ]);

    function AddCreativityController($scope,  $sce, $timeout, $mdDialog, allDataService, tokenService, $state,$rootScope) {
        var body = {};
        $scope.progress = 0;
        $scope.isOpen = false;
        $scope.addMenu = false;
        $scope.selectedMode = 'md-scale';

        $rootScope.currentPageBackground = '#fff';
        $rootScope.title = "New Creativity";

        $scope.creativity = {};
        $scope.coverStatus = false;
        $scope.creativity.items = [];
        $scope.mediumEditor = "";
        $scope.trix = "";
        body.mediaType = "text";
        body.text = "";
        $scope.creativity.items[0] = body;
        $scope.loading = false;
        $scope.title = "";

        console.log(parseInt(localStorage.getItem('seenTutorial')));

        if (!localStorage.getItem('seenTutorial') || !parseInt(localStorage.getItem('tutorial'))) {
            console.log('notset');
            localStorage.setItem('seenTutorial', true);
            localStorage.setItem('tutorial', 1);

            $mdDialog.show({
                controller: 'AddItemController',
                heading: 'Tutorial',
                templateUrl: 'app/views/partials/addBlogTutorial.html',
                parent: angular.element(document.body),
                locals: {
                    title: "tutorial"
                },
                clickOutsideToClose: true,
                escapeToClose: true

            }).then(function() {
                    localStorage.setItem('tutorial', parseInt(localStorage.getItem('tutorial')) + 1);
                }, function() {
                    localStorage.setItem('tutorial', parseInt(localStorage.getItem('tutorial')) + 1);
                }

            );

        } else if (parseInt(localStorage.getItem('tutorial')) < 4) {
            console.log('notlessthan3');

            $mdDialog.show({
                controller: 'AddItemController',
                heading: 'Tutorial',
                templateUrl: 'app/views/partials/addBlogTutorial.html',
                parent: angular.element(document.body),
                locals: {
                    title: "tutorial"
                },
                clickOutsideToClose: true,
                escapeToClose: true

            }).then(function() {
                    localStorage.setItem('tutorial', parseInt(localStorage.getItem('tutorial')) + 1);
                }, function() {
                    localStorage.setItem('tutorial', parseInt(localStorage.getItem('tutorial')) + 1);
                }

            );
        }
        $scope.url = "";
        $scope.media = {};
        $scope.media.embedUrl = "";
        $scope.media.mediaType = "";
        $scope.linkPreview = {};
        $scope.items = [];
        $scope.itemsMobile = [];

        $scope.items[0] = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 }
        ];
        $scope.items[1] = [
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
            { 'title': 'Craft', 'id': 7 }
            // { 'title': 'Dancing', 'id': 8 }
        ];
        $scope.items[2] = [
            { 'title': 'Dancing', 'id': 8 },
            { 'title': 'Singing', 'id': 9 },
            { 'title': 'Instrumental', 'id': 10 },
            { 'title': 'Digital Music', 'id': 11 },
            { 'title': 'Decor', 'id': 12 }

        ];
        $scope.items[3] = [
            { 'title': 'Film and Video', 'id': 13 },
            { 'title': 'Animation', 'id': 14 },
            { 'title': 'Graphics', 'id': 15 },
            { 'title': 'UI and UX', 'id': 16 },
            { 'title': 'Websites', 'id': 17 }
        ];
        $scope.items[4] = [
            { 'title': 'Programming', 'id': 18 },
            { 'title': 'Apps', 'id': 19 },
            { 'title': 'Electronics', 'id': 20 },
            { 'title': 'DIY', 'id': 21 }
        ];
        $scope.itemsMobile[0] = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 }
        ];
        $scope.itemsMobile[1] = [
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
        ];
        $scope.itemsMobile[2] = [
            { 'title': 'Craft', 'id': 7 },
            // { 'title': 'Dancing', 'id': 8 },
            { 'title': 'Dancing', 'id': 8 },
            { 'title': 'Singing', 'id': 9 },
            { 'title': 'Instrumental', 'id': 10 }

        ];
        $scope.itemsMobile[3] = [
            { 'title': 'Digital Music', 'id': 11 },
            { 'title': 'Decor', 'id': 12 },
            { 'title': 'Film and Video', 'id': 13 }
        ];
        $scope.itemsMobile[4] = [
            { 'title': 'Animation', 'id': 14 },
            { 'title': 'Graphics', 'id': 15 },
            { 'title': 'UI and UX', 'id': 16 }
        ];
        $scope.itemsMobile[5] = [
            { 'title': 'Websites', 'id': 17 },
            { 'title': 'Programming', 'id': 18 },
            { 'title': 'Apps', 'id': 19 }

        ];
        $scope.itemsMobile[6] = [
            { 'title': 'Electronics', 'id': 20 },
            { 'title': 'DIY', 'id': 21 }
        ];




        $scope.contents = [

            // { 'title': 'Link', 'icon': 'link-variant' },
            // { 'title': 'Embed', 'icon': 'code-tags' },
            { 'title': 'Soundcloud', 'icon': 'soundcloud', 'style': '{fill: "#ff7700"}' },
            { 'title': 'Youtube', 'icon': 'youtube-play', 'style': '{fill: "#bb0000"}' },
            { 'title': 'Vimeo', 'icon': 'vimeo', 'style': '{fill: "#4EBBFF"}' }
        ];
        $scope.selectType = function(type) {
            $scope.progress = 1;
            $scope.creativity.type = type.id;
        };
        $scope.uploadFiles = function(files) {
            $scope.files = files;
            if (files && files.length) {
                $scope.progress = 2;
                angular.forEach(files, function(file) {
                    Upload.dataUrl(file, true).then(function(url) {
                        var media = {};
                        media.mediaType = 'image';
                        media.image = url;
                        $scope.creativity.items.push(media);
                    });
                });
                $scope.addMenu = false;
            }
        };

        function tutorialController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        }

        $scope.removeCover = function() {
            for (var i = $scope.creativity.items.length - 1; i >= 0; i--) {
                if ($scope.creativity.items[i].mediaType == 'cover') {

                    console.log(i);
                    $scope.creativity.items.splice(i, 1)
                    $scope.coverStatus = false;
                }
            }

        };

        $scope.uploadCover = function(file) {
            if (file) {
                $scope.coverStatus = true;
                Upload.dataUrl(file, true).then(function(url) {
                    var cover = {};
                    cover.mediaType = 'cover';
                    cover.image = url;
                    $scope.creativity.items.push(cover);
                });
                $scope.addMenu = false;

            }
        };
        $scope.addItem = function(heading) {
            if (heading == "Text") {
                $scope.progress = 2;
            } else {
                $mdDialog.show({
                    controller: 'AddItemController',
                    templateUrl: 'app/views/partials/addItem.html',
                    parent: angular.element(document.body),
                    targetEvent: heading,
                    heading: heading,
                    scope: $scope,
                    preserveScope: true,
                    escapeToClose: true,

                    clickOutsideToClose: true,

                    controllerAs: 'dc'
                }).then(function(media) {
                    $scope.progress = 2;
                    $scope.creativity.items.push(media);
                    $scope.addMenu = false;

                    if (media.mediaType == 'Soundcloud') {
                        var widgetIframe = document.getElementById('sc-widget'),
                            widget = SC.Widget(widgetIframe),
                            newSoundUrl = $scope.embedUrlIframe;
                        widget.bind(SC.Widget.Events.READY, function() {
                            // load new widget
                            widget.bind(SC.Widget.Events.FINISH, function() {
                                widget.load(newSoundUrl, {
                                    show_artwork: false
                                });
                            });
                        });
                    }
                }, function() {
                    console.log('else');
                });
            }
        };
        var checkEditor = function() {
            if ($scope.mediumEditor) {
                $scope.creativity.items[0].text = $scpoe.mediumEditor;
            } else {
                $scope.creativity.items[0].text = $scpoe.trix;
            }
        };
        $scope.publish = function(checkEditor) {
            $scope.loading = true;
            $scope.image = {};

            $scope.creativity.tags = $scope.tags;
            $scope.creativity.title = $scope.title;
            tokenService.post("addContent", $scope.creativity)
                .then(function(status) {
                    alert(status.message);
                    if (status.status) {

                        $state.go('home.dashboard');
                    }
                    $state.go('home.dashboard');
                }).catch(function(status) {
                    alert(status.message);
                    $state.go('home.dashboard');
                    if (status.status) {

                        $state.go('home.dashboard');
                    }
                });

        };


        // Add tags shit staeted
        $scope.readonly = false;
        $scope.removable = true;
        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.querySearch = querySearch;
        $scope.vegetables = loadVegetables();
        $scope.tags = [];

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
            console.log('query funciton called');
            var results = query ? $scope.vegetables.filter(createFilterFor(query)) : [];
            return results;
        }
        var numberChips = [];
        var numberChips2 = [];
        var numberBuffer = '';
        $scope.autocompleteDemoRequireMatch = false;
        $scope.transformChip = transformChip;

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(vegetable) {
                return (vegetable._lowername.indexOf(lowercaseQuery) === 0);
                // (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
            };

        }

        function loadVegetables() {
            var veggies = [];

            return veggies.map(function(veg) {
                veg._lowername = veg.name.toLowerCase();
                return veg;
            });
        }
        $scope.skillsEdit = function() {
            $scope.readonly = !$scope.readonly;
            $scope.removable = !$scope.removable;
        }

        // Add tags shit ended
    }

})();
