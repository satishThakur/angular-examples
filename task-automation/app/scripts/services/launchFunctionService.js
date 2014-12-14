/**
 * Created by satish on 14/12/14.
 */
(function(){
    'use strict';

    var launchFuncService = function($window){
        var amslib = $window.$ams;

        if(!amslib.launchFuncObject){
            amslib.launchFuncObject = {};
        }
        var launchFuncObject = amslib.launchFuncObject;

        return {
            getLaunchFunc : function(name){
                return launchFuncObject[name];
            },

            setLaunchFunc : function(name, f){
                launchFuncObject[name] = f;
            },

            deleteLaunchFunc : function(name){
                delete launchFuncObject[name];
            },

            isLunchFuncDefined : function(name){
                return launchFuncObject.hasOwnProperty(name);
            }
        }

    };

    angular.module('app.services').factory('launchFuncService', launchFuncService);

})();