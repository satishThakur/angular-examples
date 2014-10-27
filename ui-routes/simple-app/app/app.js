/**
 * Created by satish on 25/10/14.
 */
var app = angular.module('MyApp',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/state1');

    $stateProvider.state('state1', {
        url : '/state1',
        templateUrl : 'partials/state1.html'
    }).state('state1.list', {
        url : '/list',
        templateUrl : 'partials/state1.list.html',
        controller : function($scope){
            $scope.items = ['these', 'are', 'state1.list', 'items'];
        }
    }).state('state2', {
        url : '/state2',
        templateUrl : 'partials/state2.html'
    }).state('state2.list', {
        url : '/list',
        templateUrl : 'partials/state2.list.html',
        controller : function($scope){
            $scope.things = 'so we have few things'.split(' ');
        }
    });
});

