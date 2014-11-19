/**
 * Created by skuma004 on 11/18/14.
 */

describe('Pagination directive for St Table', function(){


    var controllerMock = {
        tableState: function () {
            return tableState
        },

        slice: function (start, number) {
            tableState.pagination.start = start;
            tableState.pagination.number = number;
        }
    };

    function ControllerMock() {
        this.tableState = controllerMock.tableState;
        this.slice = controllerMock.slice;
    }

    var tableState = {
        sort: {},
        search: {},
        pagination: {start: 0}
    };

    var lis = function(){
        return element.find('li');
    }

    beforeEach(module('app.directives'));
    beforeEach(module('views/tablePagination.html'));
    beforeEach(module('views/search.html'));

    beforeEach(module('smart-table', function ($controllerProvider) {
        $controllerProvider.register('stTableController', ControllerMock);
    }));

    var scope, $compile, tpl, element;

    beforeEach(inject(function($rootScope, _$compile_) {
        scope = $rootScope;
        $compile = _$compile_;
    }));


    describe('Initial state',function(){

        beforeEach(function(){

        });

        // we take a template where we do not set anything. In that case maxSize should be set the default
        //5 and itemsPerPage should set to default 10. In this case once we get a watch callback from stTable
        // we should really invoke st table slice for display of page1.
        it('Should call the slice on controller to load the first page', function(){
            tpl = '<table st-table="displayedCollection"><tfoot><tr><td><ams-st-table-pagination total-items="totalItems"></ams-st-table-pagination></td></tr></tfoot></table>';
            spyOn(controllerMock, 'slice');
            element = $compile(tpl)(scope);
            scope.$digest();

            expect(controllerMock.slice).toHaveBeenCalledWith(0,10);

        });

        it('Should consider the page size if we provide that as an attribute in the template', function(){
            scope.itemsPerPage = 3;
            tpl = '<table st-table="displayedCollection"><tfoot><tr><td><ams-st-table-pagination items-per-page="itemsPerPage" total-items="totalItems"></ams-st-table-pagination></td></tr></tfoot></table>';
            spyOn(controllerMock, 'slice');
            element = $compile(tpl)(scope);
            scope.$digest();
            expect(controllerMock.slice).toHaveBeenCalledWith(0,3);
        });




    });


    describe('Number of pages', function(){
        beforeEach(function(){
            tpl = '<table st-table="displayedCollection"><tfoot><tr><td><ams-st-table-pagination max-size="maxSize" items-per-page="itemsPerPage" total-items="totalItems">' +
                '</ams-st-table-pagination></td></tr></tfoot></table>';
            scope.itemsPerPage = 10;
            scope.maxSize = 5;
            element = $compile(tpl)(scope);
            scope.$digest();

        });

        it('should have navigation and one page by default', function(){
            expect(lis().length).toBe(5);
            expect(lis().eq(0).text().trim()).toBe('First');
            expect(lis().eq(1).text().trim()).toBe('Previous');
            expect(lis().eq(2).text().trim()).toBe('1');
            expect(lis().eq(3).text().trim()).toBe('Next');
            expect(lis().eq(4).text().trim()).toBe('Last');

        });

        it('should have first page as active and Prev, first , last and next should be disabled', function(){
            expect(lis().eq(0).hasClass('disabled')).toBe(true);
            expect(lis().eq(1).hasClass('disabled')).toBe(true);

            expect(lis().eq(2).hasClass('disabled')).toBe(false);
            expect(lis().eq(2).hasClass('active')).toBe(true);

            expect(lis().eq(3).hasClass('disabled')).toBe(true);
            expect(lis().eq(4).hasClass('disabled')).toBe(true);
        });

        it('should change the number of pages if number of items changes on scope',function(){
            scope.totalItems = 100;
            scope.$digest();

            //4 nav, 5 active pages and one ... for moving forward so total 10
            expect(lis().length).toBe(10);

            //8th page should be ...
            expect(lis().eq(7).text().trim()).toBe('...');

            // page 1 should be active!!
            expect(lis().eq(2).hasClass('active')).toBe(true);

            //first and previous should be disabled
            expect(lis().eq(0).hasClass('disabled')).toBe(true);
            expect(lis().eq(1).hasClass('disabled')).toBe(true);

            //last and next should be enabled
            expect(lis().eq(8).hasClass('disabled')).toBe(false);
            expect(lis().eq(9).hasClass('disabled')).toBe(false);

            //... for moving forward should be enabled
            expect(lis().eq(7).hasClass('disabled')).toBe(false);

            //lets change the max pages to insanely high and see number of pages are correct
            scope.maxSize = 100;
            scope.$digest();
            expect(lis().length).toBe(14);

            //lets change number of items and see..
            scope.totalItems = 200;
            scope.$digest();
            expect(lis().length).toBe(24);

        });

    });

    describe('StTable changed do propagate back', function(){

        beforeEach(function(){
            tpl = '<table st-table="displayedCollection"><tfoot><tr><td><ams-st-table-pagination max-size="maxSize" items-per-page="itemsPerPage" total-items="totalItems">' +
                '</ams-st-table-pagination></td></tr></tfoot></table>';
            scope.itemsPerPage = 10;
            scope.maxSize = 5;
            scope.totalItems = 100;
            element = $compile(tpl)(scope);
            scope.$digest();
        });

        it('should have page 1 selected by default', function(){
            expect(lis().eq(2).hasClass('active')).toBe(true);
        });

        it('should reflect the changes made by stTable controller',function(){
            tableState.pagination = {
                start: 30,
                numberOfPages: 10,
                number: 10
            };

            scope.$digest();
            expect(lis().eq(2).hasClass('active')).toBe(false);
            //now page 4 is selected!!!
            expect(lis().eq(5).hasClass('active')).toBe(true);


            tableState.pagination = {
                start: 0,
                numberOfPages: 10,
                number: 10
            };

            //we are back to page 1!!!
            scope.$digest();
            expect(lis().eq(2).hasClass('active')).toBe(true);
            expect(lis().eq(5).hasClass('active')).toBe(false);

        });

    });


    describe('page clicks', function(){
        beforeEach(function(){

        });

        it('should respond to the clicks', function(){

            tpl = '<table st-table="displayedCollection">' +
                '<thead><tr><th colspan="3"><ams-st-table-search predicate="\'firstName\'"></ams-st-table-search></th></tr></thead>' +
                '<tfoot><tr><td><ams-st-table-pagination max-size="maxSize" items-per-page="itemsPerPage" total-items="totalItems">' +
                '</ams-st-table-pagination></td></tr></tfoot></table>';


            spyOn(controllerMock, 'slice');

            scope.itemsPerPage = 10;
            scope.maxSize = 5;
            scope.totalItems = 100;
            element = $compile(tpl)(scope);
            scope.$digest();

            angular.element(lis().eq(4).children()[0]).triggerHandler('click');
            scope.$digest();
            expect(controllerMock.slice).toHaveBeenCalledWith(20,10);

            angular.element(lis().eq(6).children()[0]).triggerHandler('click');
            scope.$digest();
            expect(controllerMock.slice).toHaveBeenCalledWith(40,10);
        });


    });

});
