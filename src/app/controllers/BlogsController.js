(function(){

  angular
    .module('app')
    .controller('BlogsController', [
      'allDataService',
      BlogsController
    ]);

  function BlogsController(allDataService) {
    var vm = this;

    vm.tableData = [];

    allDataService.get("blog_posts")
      .then(function(tableData) {
        vm.tableData = [].concat(tableData.data)
      });
  }

})();
