'use strict';


angular.module('directivesApp')
  .controller('AboutCtrl', function ($scope,$timeout,Contacts) {

        $scope.rowCollection = [];
        $scope.displayedCollection = angular.copy($scope.rowCollection);
        $scope.maxSize = 5;
        $scope.itemsPerPage = 4;
        $scope.currentPage = 1;


        $scope.pageChanged = function(tableState){
            console.log('page changed', tableState);
            tableState.pagination.size = $scope.itemsPerPage;

            Contacts.query(tableState).then(function(result){
                console.log('got data', result);
                $scope.totalItems = result.count;
                $scope.rowCollection = result.data;
            });
        };

        var getInitTableState = function(){
            var tableState = {};

            tableState.pagination = {};
            tableState.sort = {};
            tableState.pagination.page = 1;
            tableState.pagination.size = $scope.itemsPerPage;
            return tableState;
        };

        Contacts.query(getInitTableState()).then(function(result){
            console.log('got data', result);
            $scope.totalItems = result.count;
            $scope.rowCollection = result.data;
        });

        $scope.callServer = function getData(tableState, tableController) {
            console.log('call server', tableState);
            tableState.pagination.page = $scope.currentPage;
            tableState.pagination.size = $scope.itemsPerPage;

            Contacts.query(tableState).then(function(result){
                console.log('got data', result);
                $scope.totalItems = result.count;
                $scope.rowCollection = result.data;
            });

        }

    });
