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

        $scope.url = "";
        $scope.embedUrl = "";
        $scope.videoType = "";
        $scope.videoType = $scope.url.match("/http:\/\/(?:www.)?(?:(vimeo).com\/(.*)|(youtube).com\/watch\?v=(.*?)&)/");
        if ($scope.videoType == "youtube") {
            console.log('youtube');
        } else if ($scope.videoType == "vimeo") {
            console.log('vimeo');
        } else {
            // console.log('no valid url');
            // Not a valid url
        }

        $scope.submitVideo = function() {
            var videoid = $scope.url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            if (videoid != null) {
                $scope.videoType = "youtube";
                $scope.embedUrl = "https://www.youtube.com/embed/" + videoid[1];
                $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                console.log($scope.embedUrl);
            } else {
                console.log("This is not a youtube link, checking for vimeo");
                var videoid = $scope.url.match(/https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/);
                if (videoid != null) {
                    $scope.videoType = "vimeo";
                    $scope.embedUrl = "https://player.vimeo.com/video/" + videoid[3];
                    console.log($scope.embedUrl);
                    $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                } else {
                    console.log("neither youtube nor vimeo detected");
                    $scope.embedUrl = "https://w.soundcloud.com/player/?url=" + $scope.url;
                    $scope.embedUrl = $sce.trustAsResourceUrl($scope.embedUrl);
                    console.log('tried soundcloud');

                }
            }

        }
        $scope.upload = function(dataUrl, name) {
            Upload.upload({
                url: 'http://upload.campusbox.org/imageUpload.php',
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

        // Add tags shit staeted
        $scope.readonly = false;
        $scope.removable = true;
        $scope.selectedItem = null;
        $scope.searchText = null;
        $scope.querySearch = querySearch;
        $scope.vegetables = loadVegetables();
        $scope.selectedVegetables = [{
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
