'use strict';

/**
 * @ngdoc overview
 * @name directivesApp
 * @description
 * # directivesApp
 *
 * Main module of the application.
 */
angular
  .module('directivesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'smart-table',
    'app.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }).when('/contact', {
            templateUrl : 'views/contact.html'
        }).when('/times',{
          templateUrl : 'views/time.html',
          controller : 'TimeCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
