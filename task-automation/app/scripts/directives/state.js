/**
 * Created by skuma004 on 1/6/15.
 */

(function(){
  'use strict';

  var state = function(){
    return {
      restrict : 'EA',
      replace : true,
      template : '<div><input placeholder="State Name" ng-model="state" typeahead="state for state in findStates($viewValue)" class="form-control"></div>',
      scope : {

      },
      require : 'ngModel',
      controller : function($scope, States){
        $scope.findStates = function(queryString){
          return States.query({search : queryString}).$promise;
        }
      },
      link : function(scope,elems, attrs, ngModelCtrl){
        scope.$watch('state', function(value){
          ngModelCtrl.$setViewValue(value);
        });
      }

    }
  };

  angular.module('app.directives').directive('state', state);

})();