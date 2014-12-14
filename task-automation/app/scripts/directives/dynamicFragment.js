/**
 * Created by satish on 14/12/14.
 */
(function(){

    var dynamicFragment = function($compile){
        return {
            restrict : 'A',
            link : function(scope, element, attrs){

                scope.$watch(attrs.dynamicFragment, function(html){
                   if(html !== ''){
                       console.log('got the fragment', html);
                       element.html(html);
                       $compile(element.contents())(scope);
                   }else{
                       console.log('fragment empty ignoring...');
                   }
                });
            }

        };
    }


    var directives = angular.module('app.directives', []);
    directives.directive('dynamicFragment', dynamicFragment);

})();