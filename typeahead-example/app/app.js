/**
 * Created by satish on 05/01/15.
 */

(function(){
    'use strict';

    var app = angular.module('app',['ui.bootstrap','ui.bootstrap.typeahead']);

    app.controller('appCtrl', function($scope){

        $scope.states = ['Bihar', 'Karnataka', 'Himachal Pradesh', 'Utter Pradesh', 'Punjab',
            'Haryana', 'Assam', 'Sikkim'];
    });
})();