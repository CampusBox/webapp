(function() {
    'use strict';

    angular
        .module('app')
        .directive('eventsSection', eventsSectionDirective);

    function eventsSectionDirective() {
        return {
            restrict: 'E',
            scope: {
                title: '@',
                theme: '@',
                events: '='
            },
            template: '' +
                      '<section>' +
                      '  <md-subheader ng-class="theme">{{title}}</md-subheader>' +
                      '  <md-list>' +
                      '    <md-list-item class="md-3-line" ng-repeat="event in events">' +
                      '    <img class="md-avatar" ng-src="assets/images/einstein.jpg">' +
                      '    <div class="md-list-item-text">' +
                      '      <h3>{{event.subject}}</h3>' +
                      '      <h4>{{event.userName}}</h4>' +
                      '      <p>{{event.text}}</p>' +
                      '    </div>' +
                      '    </md-list-item>' +
                      '  </md-list>' +
                      '</section>',
            link : function(scope, element, attrs) {
            }
        };
    }
})();