/**
 * Created by satish on 12/12/14.
 */
(function(){
    console.log('in lib...');
    window.amsInit = function($timeout,$resource, $q){
        console.log('lib init...');

        var Lib = function(){

        };

        Lib.prototype.launch = function(context, f){
            $timeout(function(){
                f.call(context, true);
            },500);
        };


        Lib.prototype.getStateStats = function(stateName){
            var cityResource = $resource('stateStats/:state', {
               state : '@state'
            });

            return cityResource.get({state : stateName}).$promise;
        };

        window.$ams = new Lib();
        window.$ams.$q = $q;
    }

})();