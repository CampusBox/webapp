(function() {
    'use strict';

    angular.module('app').
    directive('creativityFilters', function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: 'app/components/creativity/filters/creativityFilters.html',

            controller: function($scope) {
                $scope.selected = [];
                $scope.filterInBetween = 0;
                $scope.filterShow = 0;
                $scope.selectedCategories = [];
                $scope.filterToggle = function() {
                    $scope.filterShow = !$scope.filterShow;
                };

                $scope.exists = function(item) {
                    if ($scope.selectedCategories.length == 0) {
                        return true;
                    } else {

                        return $scope.selectedCategories.indexOf(item) > -1;
                    }
                };
                var deleteList = [];
                $scope.toggle = function(item, list) {

                    var idx = $scope.selectedCategories.indexOf(item);
                    if (idx > -1) {
                        $scope.selectedCategories.splice(idx, 1);
                        deleteList.splice(idx, 1);
                        $scope.contentDetails.filters = deleteList;
                        if ($scope.filterInBetween) {
                            $scope.creativityLoading = false;
                            $scope.moreItems = true;
                            $scope.contentDetails.offset = 0;
                            $scope.filterInBetween = 0;
                            $scope.finalContentsCopy = [];
                            $scope.finalContents = [];
                            $scope.myPagingFunction();
                        } else {
                            $scope.finalContents = $scope.finalContentsCopy.filter(function(obj) {
                                return deleteList.indexOf(obj.categoryId) != -1;
                            });
                        }
                    } else {
                        $scope.selectedCategories.push(item);
                        deleteList.push(item.id);
                        $scope.contentDetails.filters = deleteList;
                        if ($scope.filterInBetween) {
                            $scope.creativityLoading = false;
                            $scope.moreItems = true;
                            $scope.contentDetails.offset = 0;
                            $scope.filterInBetween = 0;
                            $scope.finalContentsCopy = [];
                            $scope.finalContents = [];
                            $scope.myPagingFunction();
                        } else {

                            $scope.finalContents = $scope.finalContentsCopy.filter(function(obj) {
                                return deleteList.indexOf(obj.categoryId) != -1;
                            });
                        }

                        $scope.buttonClass = 'md-primary md-raised';
                    }
                    item.intrested = !item.intrested;
                    $scope.selectedCategories = $scope.selectedCategories;
                };


            }
        };
    });

})();
