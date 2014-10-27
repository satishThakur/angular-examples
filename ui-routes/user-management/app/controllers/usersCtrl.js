/**
 * Created by satish on 26/10/14.
 */
angular.module('App').controller('UsersCtrl', function($scope){
    $scope.users = [
        {
            name : 'Satish',
            role : 'admin'
        },
        {
            name : 'Joe',
            role : 'operator'
        },
        {
            name : 'John',
            role : 'config manager'
        },
        {
            name : 'Helen',
            role : 'admin'
        }

    ];
});