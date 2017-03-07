(function() {

    angular
        .module('app')
        .controller('AddBlogController', [
            'allDataService',
            '$scope',
            'Upload',
            '$sce',
            '$timeout',
            AddBlogController
        ]);

    function AddBlogController(allDataService, $scope, Upload, $sce, $timeout) {
        var vm = this;

        vm.tableData = [];

        allDataService.get("blog_posts")
            .then(function(tableData) {
                vm.tableData = [].concat(tableData.data)
            });
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

        // ng-emmbed start
        $scope.inputUrl = "http://www.youtube.com/embed/K0ibBPhiaG0";
        $scope.trustedUrl = $sce.trustAsResourceUrl("http://www.youtube.com/embed/K0ibBPhiaG0");


        var video = {embed:false,
            host: "youtube", // youtube/vimeo
            title: "Miss you jasmes hersey", // Title of the video
            //  thumbnail       :"abc.png",   // Url of the video thumbnail
            description: "String", // Description of the video truncating after 250 characters replacing linebreak (especially for vimeo)
            // rawDescription  :String,   // Description of the video as sent by the server
            views: 20, // Number of video views
            likes: 10, // No. of likes
            uploader: "String", // username of video uploader
            uploaderPage: "String", // url of uploader's page
            // uploadDate      :Date,     // Date of video upload
          //  url: "http://www.youtube.com/embed/K0ibBPhiaG0", // video url
          //  embedSrc: "http://www.youtube.com/embed/K0ibBPhiaG0", // video embed url
            width: 400,
            height: 400 // dimensions of the embedded video
        }

        $scope.video1 = video;
       $scope.options = {

        sanitizeHtml     : false,      // convert html to text

        fontSmiley       : false,      // convert ascii smileys into font smileys
        emoji            : false,      // convert emojis short names into images

         watchEmbedData   : true,     // watch embed data and render on change 

         link             : true,      // convert links into anchor tags
         linkTarget       : '_self',   //_blank|_self|_parent|_top|framename

         basicVideo       : false,     // embed video player, supports ogv|webm|mp4
         gdevAuth         :'xxxxxxxx', // Google developer auth key for YouTube data api
         video            : $scope.video1,
        code:{
          highlight : false
        }
       };
        // ng-embed end

        // ng-emmbed start
        $scope.inputUrl = "";
      $scope.trustedUrl = $sce.trustAsResourceUrl($scope.inputUrl);


        var video={
              host            :"youtube",   // youtube/vimeo
              title           :"Miss you jasmes hersey",   // Title of the video
             //  thumbnail       :"abc.png",   // Url of the video thumbnail
             description     :"String",   // Description of the video truncating after 250 characters replacing linebreak (especially for vimeo)
              // rawDescription  :String,   // Description of the video as sent by the server
               views           :20,   // Number of video views
               likes           :10,   // No. of likes
               uploader        :"String",    // username of video uploader
               uploaderPage    :"String" ,   // url of uploader's page
              // uploadDate      :Date,     // Date of video upload
              url             :$scope.trustedUrl,   // video url
              embedSrc        :$scope.trustedUrl,   // video embed url
              width           :400,
              height          :400    // dimensions of the embedded video
        }

        $scope.video1= video;
        $scope.options = {
              watchEmbedData   : true,     // watch embed data and render on change 

              sanitizeHtml     : true,      // convert html to text

        
              link             : true,      // convert links into anchor tags
              linkTarget       : '_self',   //_blank|_self|_parent|_top|framename

  
              audio            : {
                embed: true                 // toggle embedding audio player, supports wav|mp3|ogg
              },

              basicVideo       : true,     // embed video player, supports ogv|webm|mp4
              gdevAuth         :'xxxxxxxx', // Google developer auth key for YouTube data api
              video            : $scope.video,
            };

        // ng-embed end

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
