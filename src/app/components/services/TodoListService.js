(function(){
  'use strict';

  angular.module('app')
        .service('todoListService', [
        '$q',
      todoList
  ]);

  function todoList($q){
    var todos =[];

    return {
      loadAllItems : function() {
        return $q.when(todos);
      }
    };
  }
})();
