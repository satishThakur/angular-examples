/**
 * Created by satish on 23/11/14.
 */

(function(){

    'use strcit';


    var passwordConfirm = function(){
        return {
            restrict : 'A',
            require : 'ngModel',
            link : function(scope, element, attrs, ngModelCtrl){


                var validator = function(value){
                    console.log('validator called with', value);
                    var valid = (value === scope.$eval(attrs.validateEquals));
                    console.log(valid);
                    ngModelCtrl.$setValidity('equal', valid);
                    return valid ? value : undefined;
                }

                ngModelCtrl.$parsers.push(validator);
            }
        };

    };

    angular.module('app.directives').directive('validateEquals', passwordConfirm);

})();