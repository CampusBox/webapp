'use strict';

(function() {

    angular
        .module('app')
        .controller('AddBlogController', [
            '$scope',
            'Upload',
            '$sce',
            '$timeout',
            '$mdDialog',
            'allDataService',
            'tokenService',
            '$state',
            AddBlogController
        ]);

    function AddBlogController($scope, Upload, $sce, $timeout, $mdDialog, allDataService, tokenService, $state) {
        var vm = this;
        $scope.progress = 0;
        var body = {};
        $scope.creativity = {};
        $scope.creativity.items = [];
        body.text = "";
        body.mediaType = "text";
        $scope.creativity.items[0] = body;
        $scope.title = "";
        $scope.loading = false;
        if (localStorage.getItem('tutorial') != 4) {

            $mdDialog.show({
                templateUrl: 'app/views/partials/addBlogTutorial.html',
                parent: angular.element(document.body),
                // targetEvent: ev,
                locals: {
                    title: "tutorial"
                },
                clickOutsideToClose: true,
                escapeToClose: true

            }).then(function() {
                    localStorage.setItem('tutorial', 4);
                }, function() {
                    localStorage.setItem('tutorial', 4);
                }

            );
        }
        $scope.url = "";
        $scope.media = {};
        $scope.media.embedUrl = $scope.media.mediaType = "";
        $scope.linkPreview = {};
        $scope.items = [];
        $scope.items[0] = [
            { 'title': 'Articles', 'id': 1, 'intrested': false },
            { 'title': 'Poetry', 'id': 1, 'intrested': false },
            { 'title': 'Drama', 'id': 1, 'intrested': false },
            { 'title': 'Painting', 'id': 1, 'intrested': false }
        ];
        $scope.items[1] = [
            { 'title': 'Sketching', 'id': 1, 'intrested': false },
            { 'title': 'Manga', 'id': 1, 'intrested': false },
            { 'title': 'Craft', 'id': 1, 'intrested': false },
            { 'title': 'Song Covers', 'id': 1, 'intrested': false },
            { 'title': 'Instrumental', 'id': 1, 'intrested': false }

        ];
        $scope.items[2] = [
            { 'title': 'Music Mixing', 'id': 1, 'intrested': false },
            { 'title': 'Photography', 'id': 1, 'intrested': false },
            { 'title': 'Apps', 'id': 1, 'intrested': false },
            { 'title': 'Apps', 'id': 1, 'intrested': false }

        ];
        $scope.items[3] = [
            { 'title': 'Apps', 'id': 1, 'intrested': false },
            { 'title': 'Apps', 'id': 1, 'intrested': false },
            { 'title': 'Film and Video', 'id': 1, 'intrested': false },
            { 'title': 'Animation', 'id': 1, 'intrested': false },
            { 'title': 'Graphics', 'id': 1, 'intrested': false }
        ];
        $scope.items[4] = [

            { 'title': 'UI and UX', 'id': 1, 'intrested': false },
            { 'title': 'Webites', 'id': 1, 'intrested': false },
            { 'title': 'Apps', 'id': 1, 'intrested': false }
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
            $scope.creativity.type = type;
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

        function AddItemController($mdDialog, $scope, Upload, $timeout, title) {
            $scope.error = '';
            $scope.url = '';
            $scope.mediaType = "";
            $scope.title = title;

            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.submitUrl = function(url) {
                $scope.url = url;
                console.log($scope.url)
                switch (title) {
                    case 'Youtube':
                        $scope.error = '';
                        $scope.item = {};
                        var videoid = $scope.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
                        if (videoid != null) {
                            $scope.item.mediaType = "youtube";
                            $scope.item.embedUrl = "//www.youtube.com/embed/" + videoid[1];
                            $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl);
                            $mdDialog.hide($scope.item);
                        } else {
                            $scope.error = 'Invalid youtube url';
                            console.log('Invalid youtube url');
                        }
                        break;
                    case 'Soundcloud':
                        $scope.error = '';
                        $scope.item = {};
                        if ($scope.validateSoundcloud($scope.url)) {
                            $scope.item.mediaType = "soundcloud";
                            $scope.item.embedUrl = "//w.soundcloud.com/player/?url=" + $scope.url;
                            $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl);

                            $mdDialog.hide($scope.item);
                        } else {
                            $scope.error = 'Invalid soundcloud url';
                            console.log('Invalid soundcloud url');
                            $scope.mediaType = "";
                        }
                        break;
                    case 'Vimeo':
                        $scope.error = '';
                        var videoid = $scope.url.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                        if (videoid != null) {
                            $scope.item = {};
                            $scope.item.mediaType = "vimeo";
                            $scope.item.embedUrl = "//player.vimeo.com/video/" + videoid[3] + '?color=ffffff&title=0&byline=0&portrait=0&badge=0';
                            $scope.item.embedUrlIframe = $sce.trustAsResourceUrl($scope.item.embedUrl);
                            $mdDialog.hide($scope.item);
                        } else {
                            $scope.error = 'Invalid vimeo url';
                            console.log("Invalid vimeo url");
                            $scope.mediaType = "";
                        }
                        break;
                    case 'Link':
                        $scope.error = '';
                        if ($scope.validateUrl($scope.url)) {
                            var item = {};
                            item.mediaType = 'link';
                            allDataService.get($scope.url)
                                .then(function(blogs) {
                                    item.embedUrl = blogs.data;
                                });
                            $mdDialog.hide(item);
                        } else {
                            $scope.error = 'Please enter a valid url';
                        }
                        break;
                    default:
                }
            };
            $scope.validateSoundcloud = function(url) {
                var regexp = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
                return url.match(regexp) && url.match(regexp)[2]
            };
            $scope.validateUrl = function(url) {
                var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                if (res == null)
                    return false;
                else
                    return true;
            };
        }
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
        $scope.tags = [{
            'name': 'Broccoli'
        }, {
            'name': 'Cabbage'
        }];

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
            var veggies = [{
                'name': 'Broccoli'
            }, {
                'name': 'Cabbage'
            }, {
                'name': 'Carrot'
            }, {
                'name': 'Lettuce'
            }, {
                'name': 'Spinach'
            }];

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
