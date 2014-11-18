(function(){
	'use strict';

	var paginationController = function($scope,$attrs, $parse){
        console.log('controller called');
		var self = this,
            stTableCtrl = angular.noop;

		

	    this.calculateTotalPages = function() {
    		var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    		return Math.max(totalPages || 0, 1);
  		};

  		this.init = function(stTablectrl_){
            stTableCtrl = stTablectrl_;

            $scope.$watch(function () {
                return stTableCtrl.tableState().pagination;
            }, function(){
                console.log('pagination changed watch!!');
                self.render();
            }, true);

    		if ($attrs.itemsPerPage) {
                $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
                    self.itemsPerPage = parseInt(value, 10);
                    $scope.totalPages = self.calculateTotalPages();
                    console.log('itemsPerPage:', self.itemsPerPage, 'totalPages', $scope.totalPages);
                });
                } else {
                    this.itemsPerPage = 10;
                }
  		    }

  		this.render = function() {
            var paginationState = stTableCtrl.tableState().pagination;
            if(paginationState.number) {
                $scope.page = Math.floor(paginationState.start / paginationState.number) + 1;
            }else{
                console.log('ItemsPerPage', self.itemsPerPage);
                if(self.itemsPerPage) {
                    stTableCtrl.slice(0, self.itemsPerPage);
                }
            }
  		};

  		$scope.selectPage = function(page) {
  			console.log('selectPage with:', page, 'current: ', $scope.page);
            if ($scope.page !== page && page > 0 && page <= $scope.totalPages) {
                stTableCtrl.slice((page - 1) * self.itemsPerPage, self.itemsPerPage);
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
  			console.log('total pages changed', value, 'page', $scope.page);
    		if ( $scope.page > value ) {
      			$scope.selectPage(value);
    		} else {
      			self.render();
    		}
  		});

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
			require : ['tblPagination', '^stTable'],

            link : function($scope,element, attrs, controllers){
                console.log('linking starts...');
		

				var paginationCtrl = controllers[0];
                var stTableCtrl = controllers[1];

				paginationCtrl.init(stTableCtrl);

				var maxSize;

				if (attrs.maxSize) {
		        	$scope.$parent.$watch($parse(attrs.maxSize), function(value, old) {
		          		maxSize = parseInt(value, 10);
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

		          originalRender();
		          if ($scope.page > 0 && $scope.page <= $scope.totalPages) {
		              $scope.pages = getPages($scope.page, $scope.totalPages);
		          }
		      };
			}

		};

	}


	angular.module('app.directives').controller('tablePgCtrl', paginationController);
	angular.module('app.directives').directive('tblPagination', paginationDirective);

})();