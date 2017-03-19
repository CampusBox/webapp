(function(){
  'use strict';

  angular.module('app')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'Home',
        icon: 'home',
        sref: '.dashboard'
      },
      
      {
        name: 'Events',
        icon: 'calendar',
        sref: '.events'
      },
      // {
      //   name: 'Societies',
      //   icon: 'account-multiple',
      //   sref: '.societies'
      // },
      {
        name: 'Creativity',
        icon: 'all-inclusive',
        sref: '.creativity'
      }
      // {
      //   name: 'Profile',
      //   icon: 'account',
      //   sref: '.profile'
      // }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
