/**
 * Created by satish on 09/11/14.
 */
describe('pagination directive', function(){

    beforeEach(module('app.directives'))
    beforeEach(module('views/pagination.html'));

    var $scope, $compile, element ,lis;


    beforeEach(inject(function($rootScope, _$compile_){
        $scope = $rootScope;
        $compile = _$compile_;

        $scope.numPages = 5;
        $scope.currentPage = 2;

        element = $compile('<pagination num-pages="numPages" current-page="currentPage" ng-model="currentPage1" page-changed="pageChanged(page)"></pagination>')($scope);
        $scope.$digest();

        lis = function(){
            return element.find('li');
        }

    }));


    it('should have total 5 pages, and 2 for prev and  rev', function(){
         expect(lis().length).toBe(7);
    });

    it('should have total 5 pages and 3rd should be selected', function(){

        for(var page = 1; page <= $scope.numPages; page++){
            expect(lis().eq(page).text().trim()).toBe('' + page);
        }

        expect(lis().eq(2).hasClass('active')).toBe(true);

    });

    it('should have both prev and next links and both enabled', function(){
        expect(lis().eq(0).text().trim()).toBe('Prev');
        expect(lis().eq(0).hasClass('disabled')).toBe(false);

        expect(lis().eq($scope.numPages + 1).text().trim()).toBe('Next');
        expect(lis().eq($scope.numPages + 1).hasClass('disabled')).toBe(false);
    });

    it('next should move to page 3, and prev back to page 2', function(){
        element.isolateScope().next();
        $scope.$digest();
        expect(lis().eq(2).hasClass('active')).toBe(false);
        expect(lis().eq(3).hasClass('active')).toBe(true);

        element.isolateScope().prev();
        $scope.$digest();
        expect(lis().eq(2).hasClass('active')).toBe(true);
        expect(lis().eq(3).hasClass('active')).toBe(false);
    });

    it('next should be disabled if we are on last page and clicking on next should not change the page',function(){
        $scope.currentPage = 5;
        $scope.$digest();
        expect(lis().eq(5).hasClass('active')).toBe(true);
        expect(lis().eq(6).hasClass('disabled')).toBe(true);
        element.isolateScope().next();
        $scope.$digest();
        expect(lis().eq(5).hasClass('active')).toBe(true);
        expect(lis().eq(6).hasClass('disabled')).toBe(true);

    });

    it('prev should be disabled if we are on first page', function(){
        $scope.currentPage = 1;
        $scope.$digest();
        expect(lis().eq(1).hasClass('active')).toBe(true);
        expect(lis().eq(0).hasClass('disabled')).toBe(true);
        element.isolateScope().prev();
        $scope.$digest();
        expect(lis().eq(1).hasClass('active')).toBe(true);
        expect(lis().eq(0).hasClass('disabled')).toBe(true);
    });

    it('the callback on the directive should be called should a page change', function(){
        $scope.pageChanged = jasmine.createSpy('pageChanged');
        element.isolateScope().next();
        $scope.$digest();

        expect($scope.pageChanged).toHaveBeenCalledWith(3);

    });

});