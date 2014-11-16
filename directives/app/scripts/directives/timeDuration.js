(function(){
	'use strict';

	var timeDurationCtrl = function($scope){

	}

	var timeDurationDirective = function(){
		return {
			restrict : 'E',
			replace : true,
			templateUrl : 'views/times-directive.html',
			controller : timeDurationCtrl,
			require : 'ngModel',
            scope : {

            },
			link : function(scope, element, attrs, ngModelCtrl){

				var units = ['hours', 'mins', 'secs'];
				var unitValus = [3600, 60, 1];

				ngModelCtrl.$formatters.push(function(value){
                    console.log('formatter called with', value);
					var unit, value;
					for(var i = 0; i < unitValus.length; i++){
						if((value % unitValus[i]) === 0){
							unit = units[i];
							value = value / unitValus[i];	
							break;
						}
					}
					return{
						unit : unit,
						value : value
					}

				});

				ngModelCtrl.$parsers.push(function(value){
					console.log('parser is called with: ', value);
					var modelVal = 0;
					for(var i = 0; i < units.length; i++){
						if(value.unit === units[i]){
							modelVal = value.value * unitValus[i];
							break;
						}
					}
					console.log('parser retuning model value: ', modelVal);
					return modelVal;

				});

				ngModelCtrl.$render = function(){
					console.log('render called!!');
                    console.trace();
					if(!ngModelCtrl.$viewValue) ngModelCtrl.$viewValue = {unit : 'hours', value : 1};

					console.log('render viewvalue: ', ngModelCtrl.$viewValue);
					scope.unit = ngModelCtrl.$viewValue.unit;
					scope.value = ngModelCtrl.$viewValue.value;
				}

				scope.$watch('unit + value',function(){
					console.log('view changed to: ',scope.unit, scope.value);
					ngModelCtrl.$setViewValue({unit : scope.unit, value : scope.value});
				})


			}
		};
	}

	angular.module('app.directives').directive('timeDuration', timeDurationDirective);

})();