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
    'ui.bootstrap',
    'smart-table',
    'app.directives',
    'app.services'
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
        }).when('/pagination',{
            templateUrl : 'views/defpgn.html',
            controller : 'DefPgnCtrl'
        }).when('/sttable', {
            templateUrl : 'views/stTablePage.html',
            controller : 'DefStTableCtrl'
        })
      .otherwise({
        redirectTo: '/'
      });
  });
