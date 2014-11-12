'use strict';


angular.module('directivesApp')
  .controller('AboutCtrl', function ($scope,$timeout) {

        var
            nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'],
            familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];

        function createRandomItem() {
            var
                firstName = nameList[Math.floor(Math.random() * 4)],
                lastName = familyName[Math.floor(Math.random() * 4)],
                age = Math.floor(Math.random() * 100),
                email = firstName + lastName + '@whatever.com',
                balance = Math.random() * 3000;

            return{
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: email,
                balance: balance
            };
        }

        var data = [];
        for (var j = 0; j < 200; j++) {
            data.push(createRandomItem());
        }

        $scope.rowCollection = [];
        $scope.displayedCollection = angular.copy($scope.rowCollection);

        $scope.maxSize = 5;
        $scope.totalItems = data.length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 4;


        var loadContent = function(page){
            var initialIndex = (page - 1) * $scope.itemsPerPage;
            $scope.rowCollection = data.slice(initialIndex, initialIndex + $scope.itemsPerPage);
        }

        loadContent(1);

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
            loadContent($scope.currentPage);
        };

        $scope.callServer = function getData(tableState, tableController) {
            console.log('call server with: ', tableState);
        }




    });
