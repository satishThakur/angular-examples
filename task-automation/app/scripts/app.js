/**
 * Created by satish on 12/12/14.
 */
(function(){
    'use strict';

    var app = angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'app.services',
        'app.directives',
        'app.controllers'
    ]);

    app.config(function($urlRouterProvider, $stateProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home',{
            url : '/',
            controller : 'MainController',
            templateUrl : '../app/partials/main.html'

        }).state('operation',{
            url : '/operation/:name',
            controller : 'OperationController',
            templateUrl : '../app/partials/operation.html'

        }).state('create',{
            url : '/create',
            controller : 'CreateController',
            templateUrl : '../app/partials/create-operation.html'

        }).state('editOperation', {
            url : 'edit/:name',
            controller : 'EditController',
            templateUrl : '../app/partials/create-operation.html'
        });
    });

    app.run(function($window,$timeout,$resource, $q){
        $window.amsInit($timeout, $resource, $q);
    });


    app.controller('MainController', function($scope, $window, Operations){

        $scope.operations = Operations.query(function(data){
            $scope.operations = data;
        });

        $scope.deleteOperation = function(name){
            Operations.delete({name : name}, function(data){
                delete($scope.operations[name]);
            });
        }

        this.callBack = function(result){
            $scope.result = result;
        }

        if($window.$ams){
            $window.$ams.launch(this, this.callBack);
        }else{
            console.log('ERROR!! Library $ams not there...');
        }
    });
})();