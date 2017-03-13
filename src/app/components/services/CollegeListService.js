(function(){
  'use strict';

  angular.module('app')
          .service('collegesListService', [
          '$q',
          collegesListService
  ]);

  function collegesListService($q){
    var menuItems = [
      {
        name: 'Dash',
        icon: 'home-outline',
        sref: '.dashboard'
      },
      {
        name: 'Search',
        icon: 'magnify',
        sref: '.search'
      },
      {
        name: 'Events',
        icon: 'calendar',
        sref: '.events'
      },
      {
        name: 'Societies',
        icon: 'account-multiple',
        sref: '.societies'
      },
      {
        name: 'Blogs',
        icon: 'comment-text-outline',
        sref: '.blogs'
      },
      {
        name: 'Profile',
        icon: 'account',
        sref: '.profile'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
