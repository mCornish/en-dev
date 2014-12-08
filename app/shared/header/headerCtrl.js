function headerCtrl($scope, pageInfo, navMap) {

    var self = this;
    //test
    self.map = navMap.getMap();

    self.isActive = function(page) {
        return page === pageInfo.getPage() || page === pageInfo.getSection();
    };

    self.term = '';

}
angular.module('app').controller('headerCtrl', ['$scope', 'pageInfo', 'navMap', headerCtrl]);
