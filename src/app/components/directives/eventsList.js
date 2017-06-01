(function() {
    'use strict';

    angular
        .module('app')
        .directive('eventsList', eventsListDirective);

    function eventsListDirective() {
        return {
            restrict: 'E',
            scope: {
                events: '=',
                search: '=',
                update: '=',
                show: '&',
                updateIcon: '&',
                report:'&'
            },
            template: ''+
                      '<md-content>'+
                      '<md-list>'+
                      '<md-list-item ng-click="show({event:$event, index:$index});" class="secondary-button-padding " ng-repeat="event in events track by $index | toArray:false  | filter:search">'+                      '<img ng-src="{{event.image}}" class="md-avatar " alt="{{item.who}} ">'+
                      '<p>{{event.name}}</p>'+
                      '<md-button class="md-icon-button" ng-click="updateIcon();" aria-label="Update">'+
                      '<md-icon ng-if="!update" md-svg-icon="bell-outline"></md-icon>'+ 
                      '<md-icon ng-if="update" md-svg-icon="bell-ring"></md-icon>'+ 
                      '</md-button>'+
                      '<md-button class="md-icon-button " aria-label="Share ">'+
                      '<md-icon md-svg-icon="share "></md-icon>'+
                      '</md-button>'+
                      '<md-menu md-offset="0 3">'+
                      '<md-button class="md-icon-button " aria-label="Settings " ng-click="$mdMenu.open($event)">'+
                      '<md-icon md-svg-icon="dots-vertical "></md-icon>'+
                      '</md-button>'+
                      '<md-menu-content width="3">'+
                      '<md-menu-item>'+
                      '<md-button ng-click="">'+
                      '<div layout="row " flex=" " class="ng-scope layout-row flex ">'+
                      '<md-icon md-svg-icon="delete"></md-icon>'+
                      '<p flex=" " class="flex ">Less events like this</p>'+
                      '</div>'+
                      '</md-button>'+
                      '</md-menu-item>'+
                      '<md-menu-item>'+
                      '<md-button ng-click="">'+
                      '<div layout="row " flex=" " class="ng-scope layout-row flex ">'+
                      '<md-icon md-svg-icon="delete"></md-icon>'+
                      '<p flex=" " class="flex ">Move to a different category</p>'+
                      '</div>'+
                      '</md-button>'+
                      '</md-menu-item>'+
                      '<md-menu-item>'+
                      '<md-button ng-click="">'+
                      '<div layout="row " flex=" " class="ng-scope layout-row flex ">'+
                      '<md-icon md-svg-icon="delete-forever"></md-icon>'+
                      '<p flex=" " class="flex ">Less from Hackathons</p>'+
                      '</div>'+
                      '</md-button>'+
                      '</md-menu-item>'+
                      '<md-menu-item>'+
                      '<md-button ng-click="showReport(event) ">'+
                      '<div layout="row " flex=" " class="ng-scope layout-row flex ">'+
                      '<md-icon md-svg-icon="flag-outline"></md-icon>'+
                      '<p flex=" " class="flex" ng-click="report();">Report</p>'+
                      '</div>'+
                      '</md-button>'+
                      '</md-menu-item>'+
                      '</md-menu-content>'+
                      '</md-menu>'+
                      '<md-divider md-inset ng-if="!$last "></md-divider>'+
                      '</md-list-item>'+
                      '</md-list>'+
                      '</md-content>',
            link : function(scope, element, attrs) {

            }
        };
    }
})();