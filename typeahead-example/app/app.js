/**
 * Created by satish on 05/01/15.
 */

(function(){
    'use strict';

    var app = angular.module('app',['ui.bootstrap','ui.bootstrap.typeahead']);

    app.controller('appCtrl', function($scope){
        $scope.stateName = '';

        $scope.states = ['Bihar', 'Karnataka', 'Himachal Pradesh', 'Utter Pradesh', 'Punjab',
            'Haryana', 'Assam', 'Sikkim'];
    });


    app.directive('state', function(){
        return {
            restrict : 'EA',
                replace : true,
            template : '<input placeholder="State Name" ng-model="stateName" ' +
                'typeahead="state1 for state1 in states | filter : $viewValue">',
            scope : {
                stateName : '='
            }

        }
    });
})();