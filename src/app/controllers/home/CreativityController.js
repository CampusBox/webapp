'use strict';

(function() {

    angular
        .module('app')
        .controller('CreativityController', [
            '$scope',
            'tokenService',
            '$sce',
            '$state',
            '$filter',
            '$rootScope',
            'creativityCategories',
            CreativityController
        ]);

    function CreativityController($scope, tokenService, $sce, $state, $filter, $rootScope, creativityCategories) {
        $scope.creativityLoading = false;
        $rootScope.currentMenu = 'Creativity';
        $scope.moreItems = true;
        $scope.nonFinalContents = [];
        $scope.finalContents = [];
        $scope.finalContentsCopy = [];
        $rootScope.currentPageBackground = $rootScope.gray;
        $rootScope.title = "Creativity";
        $scope.types = creativityCategories.types;
        $scope.typesByID = creativityCategories.typesByID;
        $scope.mediaTypes = [4, 5, 6, 7, 12, 15, 16];
        $scope.contents = [];
        var cardObject = {};
        $scope.contentDetails = {
            "limit": 3,
            "offset": 0,
            "filters": []
        };

        //FILTERS SHIT START
            
            console.log('filters called');
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
                            console.log(obj);
                            return deleteList.indexOf(obj.content_type) != -1;
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
                            console.log(obj);
                            return deleteList.indexOf(obj.content_type) != -1;
                        });
                    }

                    $scope.buttonClass = 'md-primary md-raised';
                }
                item.intrested = !item.intrested;
                $scope.selectedCategories = $scope.selectedCategories;
            };
        // FILTERS SHIT END
        $scope.myPagingFunction = function() {
            if ($scope.creativityLoading == false && $scope.moreItems == true) {
                $scope.creativityLoading = true;
                if ($scope.contentDetails.filters.length) {
                    $scope.filterInBetween = 1;
                }
                tokenService.post("contentsList", $scope.contentDetails)
                    .then(function(tableData) {
                        $scope.creativityLoading = false;
                        if (tableData.data.length < 3) {
                            $scope.moreItems = false;
                        }
                        $scope.contents = [];
                        $scope.contents = tableData.data;
                        $scope.creativityLoading = false;
                        $scope.finalContents = $scope.finalContents.concat($scope.contents);
                        $scope.finalContentsCopy = $scope.finalContentsCopy.concat($scope.contents);

                        $scope.contentDetails.offset += 3;
                        $scope.myPagingFunction();
                    });

            }
        };


    }
}());
