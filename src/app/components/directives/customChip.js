(function() {
    'use strict';

    angular
        .module('app')
        .directive('customChip', customChipDirective);

    function customChipDirective() {
        return {
          restrict: 'EA',
          link: function(scope, elem, attrs) {
              var chipTemplateClass = attrs.class;
              elem.removeClass(chipTemplateClass);
              var mdChip = elem.parent().parent();
              mdChip.addClass(chipTemplateClass);
          }
      };
    }
})();