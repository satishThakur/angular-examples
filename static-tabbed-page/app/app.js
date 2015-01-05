/**
 * Created by skuma004 on 12/17/14.
 */

(function(){
    'use strict';
    var app = angular.module('app',['ui.router', 'ui.bootstrap','ui.codemirror']);

    app.controller('authorTaskCtrl', function($scope){
        $scope.mode = 'Javascript';
        $scope.cmOption = {
            lineNumbers: true,
            indentWithTabs: true,
            onLoad : function(_cm){

                // HACK to have the codemirror instance in the scope...
                $scope.modeChanged = function(){
                    _cm.setOption("mode", $scope.mode.toLowerCase());
                };
            }
        };

    });


    app.config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
           templateUrl : 'partials/author-task.html',
            controller : 'authorTaskCtrl',
            url : '/'
        });
    });


})();