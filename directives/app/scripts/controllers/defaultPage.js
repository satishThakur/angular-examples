
'use strict';

/**
 * @ngdoc function
 * @name directivesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the directivesApp
 */
angular.module('directivesApp')
    .controller('DefPgnCtrl', function ($scope,$timeout) {



        $scope.firstText= "First";
        $scope.lastText = "Last";
        $scope.previousText = "Prev";
        $scope.nextText = "Next";

        var itemsPerPage = 10;

        var data = _.map(_.range(100),function(num){
            return 'item-' + num;
        });

        $scope.currentPage = 1;

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

        var iterNum = 0;


        var iterative = function(){
            $timeout(function(){
                if(iterNum % 2 == 0){
                    $scope.firstText= "<";
                    $scope.lastText = ">>";
                    $scope.previousText = "<";
                    $scope.nextText = ">";
                }else{
                    $scope.firstText= "First";
                    $scope.lastText = "Last";
                    $scope.previousText = "Prev";
                    $scope.nextText = "Next";
                }

                if($scope.currentPage < $scope.numPages){
                    $scope.currentPage  = $scope.currentPage + 1;
                }else{
                    $scope.currentPage = 1;
                }

                initDataForPage($scope.currentPage);
                iterNum += 1;

                iterative();

            },1500);


        }

        iterative();



    });
