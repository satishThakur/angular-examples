/**
 * Created by satish on 08/11/14.
 */

describe('Button directive', function(){

    beforeEach(module('app.directives'));

    var $rootScope, $compile;

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));
    it('should add the correct classes for styling of button', function(){
        var template = '<button>Click me!!</button>';
        var element = $compile(template)($rootScope);
        expect(element.hasClass('btn')).toBe(true);
        expect(element.hasClass('btn-primary')).toBe(true);
        expect(element.text()).toBe('Click me!!');
    });

});
