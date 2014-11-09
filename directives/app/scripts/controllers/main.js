'use strict';

/**
 * @ngdoc function
 * @name directivesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the directivesApp
 */
angular.module('directivesApp')
  .controller('MainCtrl', function ($scope) {
        var itemsPerPage = 10;

        var data = _.map(_.range(100),function(num){
            return 'item-' + num;
        });

        $scope.currentPage = 1;
        $scope.currentPage1 = 1;

        $scope.$watch('currentPage', function(n,o){
            console.log('currentPage changed from', o, 'to', n);
            console.log('now currentPage is', $scope.currentPage);
        });

        $scope.numPages = Math.ceil(data.length/itemsPerPage);

        $scope. items = [];

        $scope.pageChanged = function(page){
            console.log('page changed to ', page);
            console.log('current page is ',$scope.currentPage);
            console.log('current page1 is ',$scope.currentPage1);
            initDataForPage(page);
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
