/**
 * Created by satish on 23/12/14.
 */
(function(){
    'use strict';

    var localStorageService = function($window){
        var localStorage = $window.localStorage;
        return {

            set : function(key, value){
                localStorage[key] = value;
            },

            get : function(key){
                return localStorage[key];
            },

            setObject : function(key, value){
                localStorage[key] = angular.toJson(value);
            },

            getObject : function(key){
                return JSON.parse(localStorage[key]);
            },

            remove : function(key){
                localStorage.removeItem(key);
            },

            getAllKeys : function(){
                var keys = [];
                for(var i = 0; i < localStorage.length; i++){
                    keys.push(localStorage.key(i));
                }
                return keys;
            }
        }
    }

    angular.module('todoApp').factory('localStorageService',localStorageService);


})();