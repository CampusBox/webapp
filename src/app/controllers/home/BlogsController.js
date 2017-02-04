(function(){

  angular
    .module('app')
    .controller('BlogsController', [
      'allDataService',
      BlogsController
    ]);

  function BlogsController(allDataService) {
    var vm = this;

    vm.tableData =  [{ "id": -1, "name": " ", "description": " ", "venue": " ", "date": " ", "time": " ", "cost": " ", "societyid": 1, "short_description": null, "image": "grey.png" }, { "id": -1, "name": " ", "description": " ", "venue": " ", "date": " ", "time": " ", "cost": " ", "societyid": 1, "short_description": null, "image": "grey.png" }, { "id": -1, "name": " ", "description": " ", "venue": " ", "date": " ", "time": " ", "cost": " ", "societyid": 1, "short_description": null, "image": "grey.png" }, { "id": -1, "name": " ", "description": " ", "venue": " ", "date": " ", "time": " ", "cost": " ", "societyid": 1, "short_description": null, "image": "grey.png" }];


    allDataService.get("blog_posts")
      .then(function(tableData) {
        vm.tableData = [].concat(tableData.data)
      });
  }

})();
