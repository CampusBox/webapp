(function() {

    angular
        .module('app')
        .controller('TableController', [
            '$scope',
            'allDataService',
            'Upload',
            '$timeout',
            TableController
        ]);

    function TableController($mdDialog, $scope,$timeout, allDataService, Upload) {
        // upload later on form submit or something similars
        $scope.submit = function() {
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        // upload on file select or drop
        // $scope.upload = function(file) {
        //     Upload.upload({
        //         url: 'upload/url',
        //         data: { file: file, 'username': $scope.username }
        //     }).then(function(resp) {
        //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        //     }, function(resp) {
        //         console.log('Error status: ' + resp.status);
        //     }, function(evt) {
        //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        //     });
        // };
        // // for multiple files:
        // $scope.uploadFiles = function(files) {
        //     if (files && files.length) {
        //         for (var i = 0; i < files.length; i++) {
        //             Upload.upload({..., data: { file: files[i] }, ... })...;
        //         }
        //         // or send them all together for HTML5 browsers:
        //         Upload.upload({..., data: { file: files }, ... })...;
        //     }
        // }
        $scope.uploadPic = function(file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: { username: $scope.username, file: file },
            });

            file.upload.then(function(response) {
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }

})();
