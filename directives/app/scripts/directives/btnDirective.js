/**
 * Created by satish on 08/11/14.
 */
/**
 * Very simple directive which styles all the button consistently.
 */

(function(){
    'use strict';
    var buttonDirective = function(){
        return {
            restrict : 'E',
            compile : function(element, attributes){
                element.addClass('btn btn-primary');
            }

        };
    };
    var app = angular.module('app.directives',['smart-table']);
    app.directive('button', buttonDirective);

})();