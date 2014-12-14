/**
 * Created by satish on 26/11/14.
 */

(function(){

    'use strict';

    var accordianCtrl = function($scope){

        var groupScopes = [];
        this.addGroup = function(scope){
            groupScopes.push(scope);

            scope.$on('$destroy',function(event){
               var index = groupScopes.indexOf(scope);
                if(index != -1){
                    groupScopes.splice(index, 1);
                }
            });
        }

        this.clicked = function(scope){

            angular.forEach(groupScopes, function(gs){
               if(gs !== scope){
                   gs.show = false;
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
    };


    var accordianGroupDirective = function(){
      return {
          restrict : 'E',
          replace : 'true',
          transclude : true,
          templateUrl : 'views/accordian.html',
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