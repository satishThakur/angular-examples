/**
 * Created by satish on 14/12/14.
 */
(function(){

    'use strict';

    var editController =  function($scope,Operations,$state, $stateParams){
        $scope.input = '';
        $scope.behaviour = '';
        $scope.output = '';
        $scope.name = '';
        $scope.description = '';

        var name = $stateParams.name;

        Operations.get({name : name},function(data){
            $scope.input = data.input;
            $scope.behaviour = data.behaviour;
            $scope.output = data.output;
            $scope.description = data.description;
            $scope.name = name;
        });

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

    angular.module('app.controllers').controller('EditController',editController);

})();