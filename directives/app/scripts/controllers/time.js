'use strict';

/**
 * @ngdoc function
 * @name directivesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the directivesApp
 */
angular.module('directivesApp')
  .controller('TimeCtrl', function ($scope) {
        
        $scope.notifyTime = 300;

        $scope.addSomeTime = function(){
            $scope.notifyTime += 30;
        }

        //just for logging no functionality!!
        $scope.$watch('notifyTime',function(newVal, oldVal){
            console.log('notify time changed from',oldVal, 'to', newVal);
        });

  });
