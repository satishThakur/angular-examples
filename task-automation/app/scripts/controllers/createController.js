/**
 * Created by satish on 14/12/14.
 */
(function(){

    'use strict';

    var createController =  function($scope,Operations,$state){
        $scope.input = '';
        $scope.behaviour = '';
        $scope.output = '';
        $scope.name = '';
        $scope.description = '';

        $scope.createOperation = function(){
            Operations.save(
                {
                    name : $scope.name,
                    input : $scope.input,
                    behaviour : $scope.behaviour,
                    output : $scope.output,
                    description : $scope.description
                },function(data){
                    $state.go('home',{},{reload : true});
                }
            );

        };

        $scope.cancel = function(){
            $state.go('home');
        }
    };

    var app = angular.module('app.controllers', []);
    app.controller('CreateController', createController);

})();