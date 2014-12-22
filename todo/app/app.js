/**
 * Created by satish on 22/12/14.
 */

(function(){
    'use strict';

    var app = angular.module('todoApp', []);


    var todoController = function($scope){
        $scope.totalTasks = 0;
        $scope.completedTasks = 0;

        $scope.tasks = [
            {name : "Master JavaScript", isCompleted : false, isEditMode : false},
            {name : "Learn jQuery", isCompleted : false,isEditMode : false},
            {name : "Explore Angular.js", isCompleted : false,isEditMode : false}
        ];

        function initStats() {
            $scope.totalTasks = $scope.tasks.length;
            $scope.completedTasks = $scope.tasks.filter(function (task) {
                return task.isCompleted;
            }).length;
            console.log($scope.totalTasks,$scope.completedTasks);
        }

        initStats();

        $scope.addTask = function(){
            $scope.tasks.push({
                name : $scope.newTask,
                isCompleted : false
            });

            $scope.newTask = '';

        };

       $scope.$watch('tasks',function(){
          initStats();
       },true);

        $scope.deleteTask = function(taskName){
            $scope.tasks = $scope.tasks.filter(function(task){
                return task.name !== taskName;
            });
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
