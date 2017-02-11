(function(){

  angular
    .module('app')
    .controller('BlogsController', [
      '$scope',
      'allDataService',
      BlogsController
    ]);

  function BlogsController($scope,allDataService) {
    var vm = this;
    $scope.liked = false;

    $scope.toggleLike = function(blogId){
      console.log(blogId);
      vm.liked = !vm.liked;
    }

    allDataService.get("blog_posts")
      .then(function(tableData) {
        vm.tableData = [].concat(tableData.data)
      });
  }

})();
