/**
 * Created by satish on 22/12/14.
 */

(function(){
    'use strict';

    var app = angular.module('todoApp', []);


    var todoController = function($scope,taskLocalStorageService){
        $scope.totalTasks = 0;
        $scope.completedTasks = 0;

        $scope.tasks = [];

        var loadFromCache = function(){
               taskLocalStorageService.getAllTasks().forEach(function(task){
                   console.log('loaded from cache', task);
                  $scope.tasks.push(task);
               });
        };

        var cacheAllTasks = function(){
            $scope.tasks.forEach(function(task){
                taskLocalStorageService.storeTask(task);
            });
        };

        function initStats() {
            $scope.totalTasks = $scope.tasks.length;
            $scope.completedTasks = $scope.tasks.filter(function (task) {
                return task.isCompleted;
            }).length;
            console.log($scope.totalTasks,$scope.completedTasks);
        }

        loadFromCache();

        initStats();

        $scope.addTask = function(){
            var task = {
                name : $scope.newTask,
                isCompleted : false,
                isEditMode : false
            };
            $scope.tasks.push(task);
            $scope.newTask = '';

        };

       $scope.$watch('tasks',function(){
           cacheAllTasks();
          initStats();

       },true);

        $scope.deleteTask = function(taskName){
            $scope.tasks = $scope.tasks.filter(function(task){
                return task.name !== taskName;
            });
            taskLocalStorageService.removeTask(taskName);
        };

       $scope.editTask = function(task){
           task.isEditMode = !task.isEditMode;
       };

       $scope.isAddDisabled = function(){
          return !$scope.newTask;
       };

    };

    app.controller('todoController', todoController);




})();
