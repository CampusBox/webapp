(function(){

  angular
    .module('app')
    .controller('SocietiesController', [
      'allDataService',
      SocietiesController
    ]);

  function SocietiesController(allDataService) {
    var vm = this;

    vm.tableData = [];

    allDataService.get("societies/Technical")
      .then(function(tableData) {
        vm.tableData = [].concat(tableData.data)
      });
  }

})();
