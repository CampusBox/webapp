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
            'Upload',
            '$rootScope',
            'creativityCategories',
            'addItemService',
            AddCreativityController
        ]);

    function AddCreativityController($scope, $sce, $timeout, $mdDialog, allDataService, tokenService, $state, Upload, $rootScope, creativityCategories, addItemService) {
        // 22 june
        $scope.publishable = false;
        $scope.compulsaryP = [1, 2, 17, 18, 19, 20, 21];
        $scope.onlyText = [1, 2];
        $scope.addMenu = true;
        $scope.publishFromDir = false;
        //
        // Functions
        $scope.showMenu = function() {
                if ($scope.addMenu) {
                    $scope.addMenu = false;
                } else {
                    $scope.addMenu = true;
                }
            };
            //
        var body = {};
        $scope.progress = 0;
        $scope.isOpen = false;
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



        if (!localStorage.getItem('seenTutorial') || !parseInt(localStorage.getItem('tutorial'))) {
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
        $scope.types = creativityCategories.types;
        $scope.items = creativityCategories.items;
        $scope.itemsMobile = creativityCategories.itemsMobile;






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
            $scope.categoryName = $scope.types[$scope.creativity.type - 1].title;
        };
        $scope.uploadFiles = function(files) {
            $rootScope.$emit("ImagesAdded");
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
        $scope.error = '';
        $rootScope.$on("returnedItem", function(event, response, errorAdd) {
            $scope.error = errorAdd;
            $scope.returnedItem = response;
            $scope.progress = 2;
            $scope.creativity.items.push(response);
            console.log($scope.creativity.items);
            $scope.addMenu = false;
            if ($scope.returnedItem.mediaType == 'Soundcloud') {
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

        });
        $scope.isAllowed = function(allowed, id) {
            if (id != undefined) {
                return allowed.indexOf(id) !== -1;
            }
        }

        // $rootScope.$on("publishable", function(event, state) {
        //     // Set variable when confirmed from respective directives 
        //     $scope.publishFromDir = state;
        //     console.log('$scope.publishFromDir ' + $scope.publishFromDir)
        // });
        $scope.checkPublish = function() {
            if ($scope.isAllowed($scope.compulsaryP, $scope.creativity.type)) {
                // If a category only text as compulsion we have to check weather min text is added or not
                $scope.textAdded = (($scope.mediumEditor || $scope.trix) && ($scope.mediumEditor.length > 20 || $scope.trix.length > 20));
                if ($scope.isAllowed($scope.onlyText, $scope.creativity.type)) {
                    // If a category has only text as compulsion it wont have publishFromDir
                    $scope.publishable = $scope.textAdded;
                } else {
                    $scope.publishable = $scope.textAdded && ($scope.websiteAdded || $scope.danceAdded || $scope.musicAdded || $scope.drawingAdded || $scope.UiUxAdded || $scope.poetryAdded);
                }
            } else {
                $scope.publishable = ($scope.websiteAdded || $scope.danceAdded || $scope.musicAdded || $scope.drawingAdded || $scope.UiUxAdded || $scope.poetryAdded);
            }
            var abc = (!($scope.title && $scope.publishable) || $scope.loading);
            return abc;
        }
        $scope.checkEditor = function() {
            console.log('checkEditor called');
            if ($scope.mediumEditor > $scope.trix) {
                $scope.creativity.items[0].text = $scope.mediumEditor;
                console.log($scope.creativity.items[0]);
            } else if ($scope.mediumEditor < $scope.trix) {
                $scope.creativity.items[0].text = $scope.trix;
                console.log($scope.creativity.items[0]);
            } else {
                console.log('else');
                $scope.creativity.items[0].text = '';
            }
        };


        $scope.publish = function() {
            $scope.checkEditor();
            $scope.loading = true;
            $scope.image = {};

            $scope.creativity.tags = $scope.tags;
            $scope.creativity.title = $scope.title;
            console.log($scope.creativity);
            tokenService.post("addNew", $scope.creativity)
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
