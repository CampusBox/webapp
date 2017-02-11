(function() {
    'use strict';

    angular
        .module('app')
        .directive('eventsGrid', eventsGridDirective);

    function eventsGridDirective() {
        return {
            restrict: 'E',
            scope: {
                events: '=',
                show: '&',
                width: '=',
                openMenu: '&'
            },
            template: ''+
                    '<div flex layout="row" layout-align="space-around" layout-wrap>' +
                    '<md-card style="float:left ; display:inline-flex; !important;" ng-repeat="event in events track by $index">' +
                    '<img style="height:{{width*10}}px !important; min-height: 200px; background: #aaa; width:auto;" ng-src="http://thapar.brinjal.in/superadmin/eventimg/{{event.image}} " class="md-card-image " alt="Washed Out ">' +
                    '<md-card-title>' +
                    '<md-card-title-text>' +
                    '<span>{{event.name}}</span>' +
                    '</md-card-title-text>' +
                    '</md-card-title>' +
                    '<md-card-content>' +
                    '</md-card-content>' +
                    '<md-card-actions layout="row " layout-align="end center ">' +
                    '<md-button ng-click="show({event:$event, index:$index})">View event</md-button>' +
                    '<md-button class="md-icon-button " aria-label="Favorite ">' +
                    '<md-icon md-svg-icon="heart-outline "></md-icon>' +
                    '</md-button>' +
                    '<md-button class="md-icon-button " aria-label="Share ">' +
                    '<md-icon md-svg-icon="share "></md-icon>' +
                    '</md-button>' +
                    '<md-menu md-offset="0 3">' +
                    '<md-button class="md-icon-button " aria-label="Settings " ng-click="openMenu({event:$event})">' +
                    '<md-icon md-svg-icon="dots-vertical "></md-icon>' +
                    '</md-button>' +
                    '<md-menu-content width="3">' +
                    '<md-menu-item>' +
                    '<md-button ng-click="" ui-sref="home.myEvents ">' +
                    '<div layout="row " flex=" " class="ng-scope layout-row flex ">' +
                    '<md-icon md-svg-icon="delete"></md-icon>' +
                    '<p flex=" " class="flex ">Less events like this</p>' +
                    '</div>' +
                    '</md-button>' +
                    '</md-menu-item>' +
                    '<md-menu-item>' +
                    '<md-button ng-click="" ui-sref="home.myEvents ">' +
                    '<div layout="row " flex=" " class="ng-scope layout-row flex ">' +
                    '<md-icon md-svg-icon="delete-forever"></md-icon>' +
                    '<p flex=" " class="flex ">Less from Hackathons</p>' +
                    '</div>' +
                    '</md-button>' +
                    '</md-menu-item>' +
                    '<md-menu-item>' +
                    '<md-button ng-click=" " ui-sref="home.profile ">' +
                    '<div layout="row " flex=" " class="ng-scope layout-row flex ">' +
                    '<md-icon md-svg-icon="flag-outline"></md-icon>' +
                    '<p flex=" " class="flex ">Report</p>' +
                    '</div>' +
                    '</md-button>' +
                    '</md-menu-item>' +
                    '</md-menu-content>' +
                    '</md-menu>' +
                    '</md-card-actions>' +
                    '</md-card>' +
                    '</div>',
            link : function(scope, element, attrs) {
              
            }
        };
    }
})();