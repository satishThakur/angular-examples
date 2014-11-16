'use strict';

/**
 * @ngdoc function
 * @name directivesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the directivesApp
 */
angular.module('directivesApp')
  .controller('MainCtrl', function ($scope,$timeout) {
        var itemsPerPage = 10;

        var data = _.map(_.range(100),function(num){
            return 'item-' + num;
        });

        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.totalItems = data.length;
        $scope.maxSize = 5;




        $scope.numPages = Math.ceil(data.length/itemsPerPage);

        $scope. items = [];

        $scope.pageChanged = function(){
            console.log('page changed to');
            console.log('current page is ',$scope.currentPage);

            initDataForPage($scope.currentPage);
        }

        var initDataForPage = function(page){
            var startIndex = (page - 1) * itemsPerPage;
            var endIndex =  startIndex + itemsPerPage;
            var data = [];
            for(var index = startIndex; index < endIndex; index++){
                data.push(index);
            }
            $scope.items = data;
        }

        initDataForPage(1);



  });
