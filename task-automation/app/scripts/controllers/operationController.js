/**
 * Created by satish on 14/12/14.
 */
(function(){

    'use strict';

    var operationController  =  function($scope,$stateParams,Operations,launchFuncService){

        $scope.result = {};
        $scope.resultDone = false;

        var name = $stateParams.name;
        var launchFuncKey = name + 'Launch';
        var self = this;
        var f = null;


        Operations.get({name : name},function(data){

            $scope.input = data.input;
            $scope.output = data.output;
            $scope.name = name;
            $scope.description = data.description;

            if(launchFuncService.isLunchFuncDefined(launchFuncKey)){
                console.log('launchfunc already defined for', launchFuncKey);
                f = launchFuncService.getLaunchFunc(launchFuncKey);
            }else{
                console.log('launch func not defined for', launchFuncKey,' defining new one');
                f = new Function('params','context','callback', data.behaviour);
                launchFuncService.setLaunchFunc(launchFuncKey,f);
            }
        });

        $scope.launch = function(){
            console.log('launched',$scope);
            f($scope,self,self.callback);
        };

        this.callback = function(value){
            console.log('final result...', value);
            $scope.result.value = value;
            $scope.resultDone = true;
        };

    };

    angular.module('app.controllers').controller('OperationController',operationController);
})();