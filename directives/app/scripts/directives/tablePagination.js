(function(){
	'use strict';

	var paginationController = function($scope,$attrs, $parse){
        console.log('controller called');
		var self =this,
		ngModelCtrl = { $setViewValue: angular.noop },
		setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

		

	    this.calculateTotalPages = function() {
    		var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    		return Math.max(totalPages || 0, 1);
  		};

  		this.init = function(ngModelCtrl_){
  			ngModelCtrl = ngModelCtrl_;
  			ngModelCtrl.$render = function() {
      			self.render();
    		};
    		if ($attrs.itemsPerPage) {
	    	$scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
	        	self.itemsPerPage = parseInt(value, 10);
	        	$scope.totalPages = self.calculateTotalPages();
	      	});
	    	} else {
	      		this.itemsPerPage = 10;
	      		$scope.totalPages = self.calculateTotalPages();
	    	}
  		}

  		this.render = function() {
    		$scope.page = parseInt(ngModelCtrl.$viewValue, 10) || 1;
  		};

  		$scope.selectPage = function(page) {
            if ($scope.page !== page && page > 0 && page <= $scope.totalPages) {
                ngModelCtrl.$setViewValue(page);
                console.log('calling render from selectPage call page:', page);
                ngModelCtrl.$render();
            }
        }

    	$scope.noPrevious = function() {
    		return $scope.page === 1;
  		};
  		$scope.noNext = function() {
    		return $scope.page === $scope.totalPages;
  		};

  		$scope.$watch('totalItems', function() {
    		$scope.totalPages = self.calculateTotalPages();
  		});

  		$scope.$watch('totalPages', function(value) {
    		setNumPages($scope.$parent, value); // Readonly variable

    		if ( $scope.page > value ) {
      			$scope.selectPage(value);
    		} else {
                console.log('calling render from totalPage watch..');
      			ngModelCtrl.$render();
    		}
  		});

        console.log('controller ends...');

	};

	

	var paginationDirective = function($parse){
		return {

			scope : {
				totalItems: '='
			},

			restrict : 'E',
			replace : true,
			controller : 'tablePgCtrl',
			templateUrl : 'views/tablePagination.html',
			require : ['ngModel', 'tblPagination', '^stTable'],
			link : function($scope,element, attrs, controllers){
                console.log('linking starts...');
		
				var ngModelCtrl = controllers[0];
				var paginationCtrl = controllers[1];
                var stTableCtrl = controllers[2];

				paginationCtrl.init(ngModelCtrl);

				var maxSize;

				if (attrs.maxSize) {
		        	$scope.$parent.$watch($parse(attrs.maxSize), function(value, old) {
		        		console.log('Maxsize', value, old);
		          		maxSize = parseInt(value, 10);
		          		console.log('calling render from maxsize..');
                        paginationCtrl.render();
		        	});
		      	}else{
		      		maxSize = 5;
		      	}

		      	// Create page object used in template
		      function makePage(number, text, isActive) {
		        return {
		          number: number,
		          text: text,
		          active: isActive
		        };
		      }

		      function getPages(currentPage, totalPages) {
		        var pages = [];
		        // Default page limits
		        var startPage = 1, endPage = totalPages;
		        
		         // Visible pages are paginated with maxSize
		         startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

		         // Adjust last page if limit is exceeded
		         endPage = Math.min(startPage + maxSize - 1, totalPages);
		       

		        // Add page number links
		        for (var number = startPage; number <= endPage; number++) {
		          var page = makePage(number, number, number === currentPage);
		          pages.push(page);
		        }

		        // Add links to move between page sets
		        if ( startPage > 1 ) {
		        	var previousPageSet = makePage(startPage - 1, '...', false);
		            pages.unshift(previousPageSet);
		         }

		        if ( endPage < totalPages ) {
		            var nextPageSet = makePage(endPage + 1, '...', false);
		            pages.push(nextPageSet);
		        }
		        return pages;
		      }

		      var originalRender = paginationCtrl.render;
		      paginationCtrl.render = function() {
                  console.log('directive render..',ngModelCtrl.$viewValue);
                  console.trace();
		          originalRender();
		          if ($scope.page > 0 && $scope.page <= $scope.totalPages) {
		              $scope.pages = getPages($scope.page, $scope.totalPages);
		          }

                  var tableState = stTableCtrl.tableState();
                  tableState.pagination.page = $scope.page;
                  tableState.pagination.size = paginationCtrl.itemsPerPage;
                  //$scope.pageChanged({tableState : tableState});
                  stTableCtrl.slice(($scope.page - 1) * paginationCtrl.itemsPerPage, paginationCtrl.itemsPerPage);
		      };

			}

		};

	}


	angular.module('app.directives').controller('tablePgCtrl', paginationController);
	angular.module('app.directives').directive('tblPagination', paginationDirective);

})();