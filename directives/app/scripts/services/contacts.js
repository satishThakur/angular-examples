/**
 * Created by satish on 17/11/14.
 */

(function(){
    'use strict';

    var contacts  = function($q,$timeout){

        var result = {};

        var data = [
            {firstName: 'Raghu', lastName : 'Ram', age : 34, email : this.firstName + this.lastName + '@whatever.com',balance : 2134},
            {firstName: 'Arun', lastName : 'Chandel', age : 24, email : this.firstName + this.lastName + '@whatever.com',balance : 4002},
            {firstName: 'Zen', lastName : 'Aurem', age : 45, email : this.firstName + this.lastName + '@whatever.com',balance : 3000},
            {firstName: 'Partha', lastName : 'Sanyal', age : 62, email : this.firstName + this.lastName + '@whatever.com',balance : 3056},
            {firstName: 'Samar', lastName : 'Jain', age : 78, email : this.firstName + this.lastName + '@whatever.com',balance : 8695},
            {firstName: 'David', lastName : 'Clark', age : 23, email : this.firstName + this.lastName + '@whatever.com',balance : 6543},
            {firstName: 'Jules', lastName : 'Button', age : 45, email : this.firstName + this.lastName + '@whatever.com',balance : 5943},
            {firstName: 'Ajay', lastName : 'Verma', age : 67, email : this.firstName + this.lastName + '@whatever.com',balance : 8685},
            {firstName: 'Victor', lastName : 'Banerjee', age : 76, email : this.firstName + this.lastName + '@whatever.com',balance : 9843},
            {firstName: 'Sahil', lastName : 'Seth', age : 32, email : this.firstName + this.lastName + '@whatever.com',balance : 2345},
            {firstName: 'Don', lastName : 'Bosco', age : 42, email : this.firstName + this.lastName + '@whatever.com',balance : 9484},
            {firstName: 'Ramesh', lastName : 'Chand', age : 56, email : this.firstName + this.lastName + '@whatever.com',balance : 1234},
            {firstName: 'Susheel', lastName : 'Thakur', age : 48, email : this.firstName + this.lastName + '@whatever.com',balance : 3234},
            {firstName: 'Aarav', lastName : 'Kumar', age : 41, email : this.firstName + this.lastName + '@whatever.com',balance : 5434},
            {firstName: 'Varun', lastName : 'Gandhi', age : 22, email : this.firstName + this.lastName + '@whatever.com',balance : 3454},
            {firstName: 'Shallabh', lastName : 'Batra', age : 28, email : this.firstName + this.lastName + '@whatever.com',balance : 5444},
            {firstName: 'Prashant', lastName : 'Bhatt', age : 63, email : this.firstName + this.lastName + '@whatever.com',balance : 5554},
            {firstName: 'Satish', lastName : 'Thakur', age : 39, email : this.firstName + this.lastName + '@whatever.com',balance : 700},
            {firstName: 'Ankur', lastName : 'Sharma', age : 30, email : this.firstName + this.lastName + '@whatever.com',balance : 8685},
            {firstName: 'Anurag', lastName : 'Bhogra', age : 27, email : this.firstName + this.lastName + '@whatever.com',balance : 7000}



        ];


        var getData = function(tableState){

            console.log('get data with', tableState);

            var result = {};
            result.count = data.length;
            var dataCopy = data;
            if(tableState.sort.predicate){
                var sortOn = tableState.sort.predicate;
                var isReverse = tableState.sort.reverse;
                console.log('sort on', sortOn, 'reverse: ', isReverse);

                if(sortOn === 'firstName'){
                    dataCopy = angular.copy(data);
                    dataCopy.sort(function(data1, data2){
                        if(isReverse){
                            if(data2.firstName > data1.firstName){
                                return 1;
                            }else if(data1.firstName > data2.firstName){
                                return -1;
                            }else{
                                return 0;
                            }
                        }else{
                            if(data1.firstName > data2.firstName){
                                return 1;
                            }else if(data2.firstName > data1.firstName){
                                return -1;
                            }else{
                                return 0;
                            }
                        }
                    });

                    console.log('sorted data', dataCopy);
                }else{
                    console.log('sort not supported yet!!');

                }

            }

            var pageNumber = tableState.pagination.page;
            var pageSize = tableState.pagination.size;

            var startIndex = (pageNumber -1) * pageSize;
            var endIndex = startIndex + pageSize;

            console.log('start index: ',startIndex, 'end index: ', endIndex);

            result.data = dataCopy.slice(startIndex, endIndex);
            return result;
        }

        result.query = function(tableState){
            var deferred = $q.defer();
            $timeout(function(){
                deferred.resolve(getData(tableState));
            },1000);

            return deferred.promise;
        }

        return result;

    }

    var serviceApp = angular.module('app.services',[]);
    serviceApp.factory('Contacts', contacts);



})();