'use strict';

(function() {

    angular
        .module('app')
        .controller('AddCreativityController', [
            '$scope',
            'Upload',
            '$sce',
            '$timeout',
            '$mdDialog',
            'allDataService',
            'tokenService',
            '$state',
            AddCreativityController
        ]);

    function AddCreativityController($scope, Upload, $sce, $timeout, $mdDialog, allDataService, tokenService, $state) {
        var vm = this;
        $scope.progress = 0;
        var body = {};
        $scope.creativity = {};
        $scope.coverStatus = 0;
        $scope.creativity.items = [];
        body.text = "";
        body.mediaType = "text";
        $scope.creativity.items[0] = body;
        $scope.title = "";
        $scope.loading = false;
         if (!localStorage.getItem('tutorial')) {
                    localStorage.setItem('tutorial', 1);
            
         }
        if (localStorage.getItem('tutorial') < 12) {

            $mdDialog.show({
                templateUrl: 'app/views/partials/addBlogTutorial.html',
                parent: angular.element(document.body),
                locals: {
                    title: "tutorial"
                },
                clickOutsideToClose: true,
                escapeToClose: true

            }).then(function() {
                    localStorage.setItem('tutorial', localStorage.getItem('tutorial')+1);
                }, function() {
                    localStorage.setItem('tutorial',  localStorage.getItem('tutorial')+1);
                }

            );
        }
        $scope.url = "";
        $scope.media = {};
        $scope.media.embedUrl = $scope.media.mediaType = "";
        $scope.linkPreview = {};
        $scope.items = [];
        $scope.items[0] = [
            { 'title': 'Articles', 'id': 1 },
            { 'title': 'Poetry', 'id': 2 },
            { 'title': 'Drama', 'id': 3 }
        ];
        $scope.items[1] = [
            { 'title': 'Paint and Colour', 'id': 4 },
            { 'title': 'Drawing ', 'id': 5 },
            { 'title': 'Sewing and Fabric', 'id': 6 },
            { 'title': 'Craft', 'id': 7 },
            { 'title': 'Clay', 'id': 8 }
        ];
        $scope.items[2] = [
            { 'title': 'Singing', 'id': 9 },
            { 'title': 'Instrumental', 'id': 10 },
            { 'title': 'Music Mixing', 'id': 11 },
            { 'title': 'Photography', 'id': 12 }

        ];
        $scope.items[3] = [
            { 'title': 'Film and Video', 'id': 13 },
            { 'title': 'Animation', 'id': 14 },
            { 'title': 'Graphics', 'id': 15 },
            { 'title': 'UI and UX', 'id': 16 },
            { 'title': 'Webites', 'id': 17 }
        ];
        $scope.items[4] = [
            { 'title': 'Programming', 'id': 18 },
            { 'title': 'Apps', 'id': 19 },
            { 'title': 'Electronics', 'id': 20 },
            { 'title': 'DIY', 'id': 21 }
        ];
        $scope.contents = [

            // { 'title': 'Link', 'icon': 'link-variant' },
            // { 'title': 'Embed', 'icon': 'code-tags' },
            { 'title': 'Soundcloud', 'icon': 'soundcloud' },
            { 'title': 'Youtube', 'icon': 'youtube-play' },
            { 'title': 'Vimeo', 'icon': 'vimeo' }
        ];
        $scope.selectType = function(type) {
            $scope.progress = 1;
            $scope.creativity.type = type.id;
        };
        $scope.uploadFiles = function(files) {
            $scope.files = files;
            if (files && files.length) {
                console.log('media');
                $scope.progress = 2;
                angular.forEach(files, function(file) {
                    Upload.dataUrl(file, true).then(function(url) {
                        var media = {};
                        media.mediaType = 'image';
                        media.image = url;
                        console.log(media);
                        $scope.creativity.items.push(media);
                    })
                })
            }
        };
        $scope.uploadCover = function(file) {
            if (file) {
                $scope.coverStatus = 1;
                Upload.dataUrl(file, true).then(function(url) {
                    var cover = {};
                    cover.mediaType = 'cover';
                    cover.image = url;
                    console.log(cover);
                    $scope.creativity.items.push(cover);
                });
            }
        };
        $scope.addItem = function(title) {
            if (title == "Text") {
                $scope.progress = 2;
            } else {
                $mdDialog.show({
                    controller: AddItemController,
                    templateUrl: 'app/views/partials/addItem.html',
                    parent: angular.element(document.body),
                    targetEvent: title,
                    title: title,
                    scope: $scope,
                    preserveScope: true,
                    escapeToClose: true,

                    clickOutsideToClose: true,

                    controllerAs: 'dc'
                }).then(function(media) {
                    $scope.progress = 2;
                    $scope.creativity.items.push(media);
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

     
        $scope.addImage = function(file) {
            console.log('abc');
        };
        $scope.publish = function() {
            $scope.loading = true;
            $scope.image = {};

            $scope.creativity.tags = $scope.tags;
            $scope.creativity.title = $scope.title;
            tokenService.post("addContent", $scope.creativity)
                .then(function(status) {
                    alert(status.status);
                    $state.go('home.dashboard');
                }).catch(function(status) {
                    alert(status.status);
                    $state.go('home.dashboard');
                    console.log(status);
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
