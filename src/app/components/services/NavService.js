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
        name: 'Dash',
        icon: 'home-outline',
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
        name: 'Blogs',
        icon: 'comment-text-outline',
        sref: '.blogs'
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
