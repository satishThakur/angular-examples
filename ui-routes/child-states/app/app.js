/**
 * Created by satish on 08/12/14.
 */

(function(){

    'use strict';

    var app = angular.module('App', ['ui.router']);


    app.config(function($urlRouterProvider, $stateProvider){

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url : '/home',
            templateUrl : 'partials/home.html',
            controller : 'HomeCtrl'
        }).state('contacts', {
            url : '/contacts',
            templateUrl : 'partials/contacts.html',
            controller : 'ContactsCtrl'
        }).state('contacts.favourite', {
            views : {
                '@' : {
                    templateUrl: 'partials/contacts.html',
                    controller : 'FavouriteCtrl'
                }
            }

        }).state('contacts.recent', {
            views : {
                '@' : {
                    templateUrl: 'partials/contacts.html',
                    controller : 'RecentCtrl'
                }
            }
        });
    });


    app.controller('HomeCtrl', function($scope){

    });

    app.controller('ContactsCtrl', function($scope){
        $scope.allContacts = true;
           $scope.contacts = [
            {
                id : 1,
                name : 'David White'
            },
            {
                id : 1,
                name : 'Alan Craft'

            },
            {
                id : 1,
                name : 'Satish Thakur'

            },
            {
                id : 1,
                name : 'Jeoff Thomas'

            }
        ];
    });

    app.controller('FavouriteCtrl', function($scope){
        $scope.allContacts = false;
        $scope.contacts = [
            {
                id : 1,
                name : 'David White'
            },
            {
                id : 1,
                name : 'Alan Craft'

            }
        ];
    });

    app.controller('RecentCtrl', function($scope){
        $scope.allContacts = false;
        $scope.contacts = [
            {
                id : 1,
                name : 'Satish Thakur'

            },
            {
                id : 1,
                name : 'Jeoff Thomas'

            }
        ];
    });




})();