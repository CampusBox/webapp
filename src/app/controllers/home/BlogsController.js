(function() {

    angular
        .module('app')
        .controller('BlogsController', [
            '$scope',
            'tokenService',
            BlogsController
        ]);

    function BlogsController($scope, tokenService) {
        var vm = this;
        $scope.liked = false;

        $scope.toggleLike = function(blogId) {
            console.log(blogId);
            vm.liked = !vm.liked;
        }

        tokenService.get("contents")
            .then(function(tableData) {
                vm.tableData = [].concat(tableData.data)
            });
    }

})();
