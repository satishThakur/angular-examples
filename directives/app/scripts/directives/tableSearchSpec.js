/**
 * Created by skuma004 on 11/18/14.
 */

describe('Pagination directive for St Table', function(){


    var controllerMock = {
        tableState: function () {
            return tableState
        },

        search: function (input, predicate) {
            var predicateObject = tableState.search.predicateObject || {};
            predicateObject[predicate] = input;
            tableState.search.predicateObject = predicateObject;

        }
    };

    function ControllerMock() {
        this.tableState = controllerMock.tableState;
        this.search = controllerMock.search;
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
    beforeEach(module('views/search.html'));

    beforeEach(module('smart-table', function ($controllerProvider) {
        $controllerProvider.register('stTableController', ControllerMock);
    }));

    var scope, $compile, tpl, element;

    beforeEach(inject(function($rootScope, _$compile_) {
        scope = $rootScope;
        $compile = _$compile_;
    }));




    describe('page clicks', function(){
        beforeEach(function(){

        });

        it('should call search on controller when search is clicked', function(){

            tpl = '<table st-table="displayedCollection">' +
                '<thead><tr><th colspan="3"><table-search predicate="\'firstName\'"></table-search></th></tr></thead>' +
                '</table>';

            spyOn(controllerMock, 'search');
            element = $compile(tpl)(scope);
            scope.$digest();
            console.log(element);

            var searchElement = element.find('button').eq(0);
            angular.element(searchElement).triggerHandler('click');

            expect(controllerMock.search).toHaveBeenCalledWith('', 'firstName');

        });


        it('should not call search on controller when clear is clicked and there is no text', function(){

            tpl = '<table st-table="displayedCollection">' +
                '<thead><tr><th colspan="3"><table-search predicate="\'firstName\'"></table-search></th></tr></thead>' +
                '</table>';

            spyOn(controllerMock, 'search');
            element = $compile(tpl)(scope);
            scope.$digest();
            console.log(element);

            var clearElement = element.find('button').eq(1);
            angular.element(clearElement).triggerHandler('click');
            scope.$digest();
            expect(controllerMock.search.calls.any()).toEqual(false);
        });
    });

});
