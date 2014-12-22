/**
 * Created by satish on 23/12/14.
 */
(function(){
    'use strict';

    var taskLocalStorageService = function(localStorageService){
        var keyPrefix = 'tasks';

        var generateTaskKey = function(key){
            return key + keyPrefix;
        };

        var iSTaskKey = function(key){
            return key.indexOf(keyPrefix) != -1;
        }
        return {

            storeTask : function(task){
                localStorageService.setObject(generateTaskKey(task.name), task);
            },

            getTask : function(taskName){
                return localStorageService.getObject(generateTaskKey(taskName));
            },

            removeTask : function(taskName){
              localStorageService.remove(generateTaskKey(taskName));
            },

            getAllTasks : function(){
                var keys = localStorageService.getAllKeys();
                var tasks = [];
                keys.forEach(function(key){
                    console.log(typeof key, key);
                    if(iSTaskKey(key)){
                        tasks.push(localStorageService.getObject(key));
                    }
                });
                return tasks;
            }
        }
    }

    angular.module('todoApp').factory('taskLocalStorageService',taskLocalStorageService);


})();