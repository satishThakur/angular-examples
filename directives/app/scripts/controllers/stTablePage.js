(function(){

	angular.module('directivesApp').controller('DefStTableCtrl',function($scope){
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

        $scope.rowCollection = [];
        $scope.displayedCollection = angular.copy($scope.rowCollection);


        $scope.itemsPerPage = 4;

        $scope.callServer = function(tableState, ctrl){
        	//console.trace();
        	//console.log('call server called!!', tableState);
        	tableState.pagination.numberOfPages = Math.ceil(data.length / $scope.itemsPerPage);

        	var page = tableState.pagination.start;

        	$scope.rowCollection = data.slice(page, page + $scope.itemsPerPage);

        }





	});

})();
