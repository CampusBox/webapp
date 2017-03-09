(function() {

    angular
        .module('app')
        .controller('AddBlogController', [
            '$scope',
            'Upload',
            '$sce',
            '$timeout',
            AddBlogController
        ]);

    function AddBlogController($scope, Upload, $sce, $timeout) {
        var vm = this;

        $scope.content = {};
        $scope.title = "";
        $scope.body = "";
        $scope.url = "";
        $scope.embedUrl = "";
        $scope.mediaType = "";
        $scope.getSoundCloudInfo = function(url) {
            var regexp = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
            return url.match(regexp) && url.match(regexp)[2]
        }
        $scope.submitVideo = function() {
            var videoid = $scope.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            $scope.mediaType = "";
            if (videoid != null) {
                $scope.mediaType = "youtube";
                $scope.embedUrl = "https://www.youtube.com/embed/" + videoid[1];
                $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                console.log($scope.embedUrl);
            } else {
                console.log("This is not a youtube link, checking for vimeo");
                var videoid = $scope.url.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                if (videoid != null) {
                    $scope.mediaType = "vimeo";
                    $scope.embedUrl = "https://player.vimeo.com/video/" + videoid[3];
                    console.log($scope.embedUrl);
                    $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                } else {
                    console.log("neither youtube nor vimeo detected");
                    $scope.mediaType = "";
                }
            }
        }
        $scope.submitSoundcloud = function() {
            $scope.mediaType = "";
            if ($scope.getSoundCloudInfo($scope.url)) {
                $scope.mediaType = "soundcloud";
                $scope.embedUrl = "https://w.soundcloud.com/player/?url=" + $scope.url;
                $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                var widgetIframe = document.getElementById('sc-widget'),
                    widget = SC.Widget(widgetIframe),
                    newSoundUrl = $scope.embedUrl;
                widget.bind(SC.Widget.Events.READY, function() {
                    // load new widget
                    widget.bind(SC.Widget.Events.FINISH, function() {
                        widget.load(newSoundUrl, {
                            show_artwork: false
                        });
                    });
                });
            } else {
                console.log('Invalid soundcloud url');
                $scope.mediaType = "";
            }
        }
        $scope.upload = function(dataUrl, name) {
            Upload.upload({
                url: 'https://upload.campusbox.org/imageUpload.php',
                method: 'POST',
                file: Upload.dataUrltoBlob(dataUrl, name),
                data: {
                    'targetPath': './media/'
                },
            }).then(function(response) {
                $timeout(function() {
                    $scope.result = response.data;
                });
            }, function(response) {
                if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
        $scope.uploadFiles = function(files, errFiles) {
            $scope.files = files;
            $scope.errFiles = errFiles;
            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: 'http://upload.campusbox.org/imageUpload.php',
                    file: file,
                    data: {
                        'targetPath': './media/'
                    }
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                    });
                }, function(response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });
        }

        $scope.publish = function() {
            $scope.content.mediaType = $scope.mediaType;
            $scope.content.embedUrl = $scope.embedUrl;
            $scope.content.tags = $scope.tags;
            $scope.content.title = $scope.title;
            $scope.content.body = $scope.body;
            console.log($scope.content);

        }

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
            console.log('query funciton called');
            var results = query ? $scope.vegetables.filter(createFilterFor(query)) : [];
            return results;
        }

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
