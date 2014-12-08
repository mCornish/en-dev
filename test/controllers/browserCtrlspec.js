describe('browserCtrl', function() {

    var $scope, ctrl;

    var pageInfoMock;


    beforeEach(function() {

        pageInfoMock = jasmine.createSpyObj('pageInfo', ['getPartial']);


        module('app');


        inject(function($rootScope, $controller) {

            $scope = $rootScope.$new();

            pageInfoMock.getPartial.and.returnValue('<p>Partial text</p>');

            ctrl = $controller('browserCtrl', {
                $scope: $scope,
                pageInfo: pageInfoMock
            });
        });
    });


    it('should have getPage function', function() {

        expect(ctrl.getPage).toBeDefined();

    });

    it('should retrieve the appropriate partial view with getPage()', function() {

        expect(ctrl.getPage()).toBe('<p>Partial text</p>');

    });

});
