/**
 * Created by satish on 05/01/15.
 */

(function(){
    'use strict';

    var app = angular.module('app',['ui.bootstrap','ui.bootstrap.typeahead']);

    app.controller('appCtrl', function($scope){
        //$scope.stateName = '';

        $scope.states = ['Bihar', 'Karnataka', 'Himachal Pradesh', 'Utter Pradesh', 'Punjab',
            'Haryana', 'Assam', 'Sikkim'];
    });


    app.directive('state', function(){
        return {
            restrict : 'EA',
                replace : true,
            template : '<div><input placeholder="State Name" ng-model="state1" ' +
                'typeahead="state1 for state1 in states | filter : $viewValue"></div>',
            scope : {

            },
            require : 'ngModel',
            controller : function($scope){
              $scope.states = ['Bihar', 'Karnataka', 'Himachal Pradesh', 'Utter Pradesh', 'Punjab',
                'Haryana', 'Assam', 'Sikkim'];
            },
            link : function(scope,elems, attrs, ngModelCtrl){
                scope.$watch('state1', function(value){
                  ngModelCtrl.$setViewValue(value);
                });
            }

        }
    });
})();