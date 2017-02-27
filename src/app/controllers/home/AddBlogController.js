(function() {

    angular
        .module('app')
        .controller('AddBlogController', [
            'allDataService',
            '$scope',
            'Upload',
            '$timeout',
            AddBlogController
        ]);

    function AddBlogController(allDataService, $scope, Upload, $timeout) {
        var vm = this;

        vm.tableData = [];

        allDataService.get("blog_posts")
            .then(function(tableData) {
                vm.tableData = [].concat(tableData.data)
            });

        //IMAGE UPLOAD CODE START
        // $scope.upload = function(dataUrl, name) {
        //         Upload.upload({
        //             method: 'POST',
        //             file: Upload.dataUrltoBlob(dataUrl, name),
        //             data: {
        //             },
        //         }).then(function(response) {
        //             $timeout(function() {
        //                 $scope.result = response.data;
        //             });
        //         }, function(response) {
        //             if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
        //         }, function(evt) {
        //             $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        //         });
        //     }

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
            //IMAGE UPLOAD CODE END
    }

})();
