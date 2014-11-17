/**
 * Created by satish on 17/11/14.
 */
(function(){
    'use strict';



    var searchDirective = function(){
        return {
            restrict : 'E',
            replace : true,
            templateUrl : 'views/search.html',
            require : '^stTable',
            scope : {
              predicate : '='
            },
            link : function(scope, element, attr, stTableCtrl){

                scope.search = '';

                scope.doSearch = function(){
                    if(scope.search !== ''){
                        console.log('search for ', scope.search);
                        stTableCtrl.search(scope.search, scope.predicate);
                    }
                }

                scope.clear = function(){
                    if(scope.search !== ''){
                        scope.search = '';
                        console.log('cleared search...');
                        stTableCtrl.search(scope.search, scope.predicate);
                    }
                }

            }

        };
    }


    angular.module('app.directives').directive('tableSearch', searchDirective);

})();
