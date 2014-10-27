/**
 * Created by satish on 26/10/14.
 */
angular.module('App').controller('UserCtrl', function($scope, $stateParams){
   var users =  [
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

   var name = $stateParams.id;
   $scope.user = null;
   angular.forEach(users, function(usr){
     if(usr.name == name){
         $scope.user = usr;
     }
   });

});