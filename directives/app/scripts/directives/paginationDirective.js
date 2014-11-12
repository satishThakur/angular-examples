/**
 * Created by satish on 08/11/14.
 */

(function(){

    'use strict';

    var paginationDirective = function(){
        return {

            restrict : 'E',
            templateUrl : 'views/pagination.html',
            replace : true,
            require: '?ngModel',
            scope : {
                numPages : '=',
                currentPage : '=',
                pageChanged : '&'
            },

            link : function(scope, element, attributes, ngModelCtrl){
                scope.pages = [];
                scope.$watch('numPages', function(pagesCount){
                    for(var i =1; i <= pagesCount; i++){
                        scope.pages.push(i);
                    }

                    if(scope.currentPage > pagesCount){
                        scope.currentPage = pagesCount;
                    }
                });

                scope.isActive = function(page){
                    return page === scope.currentPage;
                };

                scope.setPage = function(page){
                    if(!scope.isActive(page)){
                        scope.currentPage = page;
                        ngModelCtrl.$setViewValue(page);
                        console.log('Directive got page changed: ', page);
                        scope.pageChanged({page : page});
                    }
                };

                scope.noPrev = function(){
                    return scope.currentPage === 1;
                };

                scope.noNext = function(){
                    return scope.currentPage === scope.pages.length;
                };

                scope.next = function(){
                    if(!scope.noNext())
                        scope.setPage(scope.currentPage + 1);

                };

                scope.prev = function(){
                    if(!scope.noPrev())
                        scope.setPage(scope.currentPage -1);
                }
            }

        };
    }

    angular.module('app.directives').directive('myPagination', paginationDirective);


})();