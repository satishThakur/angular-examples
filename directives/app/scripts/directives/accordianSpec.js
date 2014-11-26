/**
 * Created by satish on 27/11/14.
 */
/**
 * Created by satish on 26/11/14.
 */

describe('Accordian controller specs', function(){

    var $controller;
    var accordianCtrl;
    var scope;
    beforeEach(module('app.directives'));

    beforeEach(inject(function(_$controller_, _$rootScope_){
        $controller = _$controller_;
        scope = _$rootScope_;
        accordianCtrl = $controller('accordianCtrl',{$scope : scope.$new()});

    }));

    it('should mark show of all others false', function(){
        var group1Scope = scope.$new();
        var group2Scope = scope.$new();
        var group3Scope = scope.$new();

        group1Scope.show = true;
        group2Scope.show = true;
        group3Scope.show = true;

        accordianCtrl.addGroup(group1Scope);
        accordianCtrl.addGroup(group2Scope);
        accordianCtrl.addGroup(group3Scope);

        accordianCtrl.clicked(group2Scope);

        expect(group1Scope.show).toBe(false);
        expect(group2Scope.show).toBe(true);
        expect(group3Scope.show).toBe(false);



    });




});
