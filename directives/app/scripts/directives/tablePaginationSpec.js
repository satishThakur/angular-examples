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

    beforeEach(module('app.directives'))
    beforeEach(module('views/tablePagination.html'));

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
            tpl = '<table st-table="displayedCollection"><tfoot><tr><td><tbl-pagination total-items="totalItems"></tbl-pagination></td></tr></tfoot></table>';
            spyOn(controllerMock, 'slice');
            element = $compile(tpl)(scope);
            scope.$digest();
            console.log(element);
            expect(controllerMock.slice).toHaveBeenCalledWith(0,10);

        });

        it('Should consider the page size if we provide that as an attribute in the template', function(){
            scope.itemsPerPage = 3;
            tpl = '<table st-table="displayedCollection"><tfoot><tr><td><tbl-pagination items-per-page="itemsPerPage" total-items="totalItems"></tbl-pagination></td></tr></tfoot></table>';
            spyOn(controllerMock, 'slice');
            element = $compile(tpl)(scope);
            scope.$digest();
            console.log(element);
            expect(controllerMock.slice).toHaveBeenCalledWith(0,3);
        });




    });










});
