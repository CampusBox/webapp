(function(){

  angular
    .module('app')
    .controller('AddBlogController', [
      'allDataService',
      AddBlogController
    ]);

  function AddBlogController(allDataService) {
    var vm = this;

    vm.tableData = [];

    allDataService.get("blog_posts")
      .then(function(tableData) {
        vm.tableData = [].concat(tableData.data)
      });
  }

})();
