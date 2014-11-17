'use strict';


angular.module('directivesApp')
  .controller('AboutCtrl', function ($scope,Contacts) {

        $scope.rowCollection = [];
        $scope.displayedCollection = angular.copy($scope.rowCollection);
        $scope.maxSize = 5;
        $scope.itemsPerPage = 4;


        var getInitTableState = function(){
            var tableState = {};

            tableState.pagination = {};
            tableState.sort = {};
            tableState.pagination.page = 1;
            tableState.pagination.size = $scope.itemsPerPage;
            return tableState;
        };

        Contacts.query(getInitTableState()).then(function(result){
            //console.log('got data', result);
            $scope.totalItems = result.count;
            $scope.rowCollection = result.data;
        });

        $scope.callServer = function getData(tableState, tableController) {
            console.log('call server', tableState);

            if(tableState.pagination.number) {
                tableState.pagination.page = Math.floor(tableState.pagination.start / tableState.pagination.number) + 1;
            }else{
                tableState.pagination.page = 1;
            }
            tableState.pagination.size = $scope.itemsPerPage;

            Contacts.query(tableState).then(function(result){
                console.log('got data', result);
                $scope.totalItems = result.count;
                $scope.rowCollection = result.data;
            });

        }

    });
