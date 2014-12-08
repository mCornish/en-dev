describe('headerCtrl', function() {

    var $scope, ctrl;

    var pageInfoMock, navMapMock;


    beforeEach(function() {

        pageInfoMock = jasmine.createSpyObj('pageInfo', ['getPage', 'getSection']);

        navMapMock = jasmine.createSpyObj('navMap', ['getMap']);


        module('app');


        inject(function($rootScope, $controller) {

            $scope = $rootScope.$new();

            pageInfoMock.getPage.and.returnValue('overview1');
            pageInfoMock.getSection.and.returnValue('overview');

            navMapMock.getMap.and.returnValue([
                {
                  'name':'overview',
                  'contentBool': true,
                  'pages':
                  [
                    {
                      'name':'overview1'
                    },
                    {
                      'name':'overview2'
                    }
                  ]
                },
                {
                  'name':'documentation',
                  'contentBool': true,
                  'pages':
                  [
                    {
                      'name':'sync'
                    },
                    {
                      'name':'thrift'
                    }
                  ]
                }
            ]);

            ctrl = $controller('headerCtrl', {
                $scope: $scope,
                pageInfo: pageInfoMock,
                navMap: navMapMock
            });
        });
    });


    it('should have map and isActive objects', function() {

        expect(ctrl.map).toBeDefined();
        expect(ctrl.isActive).toBeDefined();

    });


    it('should return "overview" when map[0].name is called', function() {

        expect(ctrl.map[0].name).toEqual('overview');

    });


    it('should detect whether a page is active', function() {
        expect(ctrl.isActive('overview')).toBe(true);
        expect(ctrl.isActive('overview1')).toBe(true);
        expect(ctrl.isActive('documentation')).toBe(false);
    });
});
