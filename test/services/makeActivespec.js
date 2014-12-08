describe('Service: makeActive', function() {

    var makeActive, $location;

    beforeEach(function() {

        module('app', functio);

        inject(function(_makeActive_, _$location_) {

            makeActive = _makeActive_;
            $location = _$location_;

        });
    });

    // it('should be a function', function() {
    //     expect(angular.isFunction(makeActive)).toBe(true);
    // });
    //
    // it('should check whether a page or section is the current location', function() {
    //     $location.path('/overview/overview1');
    //     expect($location.path()).toEqual('/overview/overviw1');
    //     expect(currentPage).toEqual('overview1');
    //     expect(currentSection).toEqual('overview');
    // });

});
