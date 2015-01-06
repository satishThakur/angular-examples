/**
 * Created by skuma004 on 1/6/15.
 */
(function(){
  'use strict';

  var states = function($resource){
    return $resource('states');

  };

  angular.module('app.services').factory('States', states);
})();