'use strict';

/**
 * @ngdoc function
 * @name directivesApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the directivesApp
 */
angular.module('directivesApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
