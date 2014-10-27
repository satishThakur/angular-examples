angular.module('App', ['ui.router']);

angular.module('App').config(function($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider.state('dashboard', {
        url : '/dashboard',
        views : {
            '@' : {
                templateUrl: 'partials/dashboard.html',
                controller: 'DashBoardCtrl'
            }
        }
    }).state('users', {
        url : '/users',
        views : {
            '@' : {
                templateUrl : 'partials/users.html',
                controller : 'UsersCtrl'
            }
        }

    }).state('users.user', {
        url : '/:id',
        views : {
            '@users' : {
                templateUrl : 'partials/user.html',
                controller : 'UserCtrl'
            }
        }

    });
});
