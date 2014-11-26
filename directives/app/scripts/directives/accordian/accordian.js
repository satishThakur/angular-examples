/**
 * Created by satish on 26/11/14.
 */

(function(){

    'use strict';

    var accordianCtrl = function($scope){

        var groupScopes = [];
        this.addGroup = function(scope){
            groupScopes.push(scope);
        }

        this.clicked = function(scope){

            angular.forEach(groupScopes, function(gs){
               if(gs !== scope){
                   gs.setShow(false);
               }
            });
        }
    };
    

    var accordianDirective = function(){
        return {
            restrict : 'E',
            template: '<div ng-transclude class="accordian"></div>',
            controller : 'accordianCtrl',
            transclude : true,
            replace : true
        };
    };

    var accordianGroupCtrl = function($scope){
        $scope.show = false;

        $scope.setShow = function(value){
            $scope.show = value;
        };
    };


    var accordianGroupDirective = function(){
      return {
          restrict : 'E',
          replace : 'true',
          transclude : true,
          templateUrl : 'scripts/directives/accordian/accordian.html',
          scope : {
                title : '@'
          },
          controller : 'accordianGroupCtrl',
          require : '^accordian',

          link : function(scope, element, attrs, accordianCtrl){
              accordianCtrl.addGroup(scope);

              scope.toggle = function(){
                  accordianCtrl.clicked(scope);
                  scope.show = !scope.show;
              }
          }
      };
    };

    angular.module('app.directives').controller('accordianCtrl', accordianCtrl);
    angular.module('app.directives').controller('accordianGroupCtrl', accordianGroupCtrl);

    angular.module('app.directives').directive('accordian', accordianDirective);
    angular.module('app.directives').directive('accordianGroup', accordianGroupDirective);

})();