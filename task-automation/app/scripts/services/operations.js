/**
 * Created by satish on 13/12/14.
 */
(function(){
    'use strict';

    var operations = function($resource){

        return $resource('operations/:name',
            {
                name : '@name'
            },
            {
                'query' : {method : 'GET', isArray : false}
            }
        );
    }
    var services = angular.module('app.services',['ngResource']);
    services.factory('Operations', operations);
})();