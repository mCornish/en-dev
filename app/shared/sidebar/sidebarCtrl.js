function sidebarCtrl($scope, $location, pageInfo, navMap) {

    var self = this;

    self.map = navMap.getMap();

    self.isActive = function(page) {
        return page === pageInfo.getPage() || page === pageInfo.getSection();
    };
}

angular.module('app').controller('sidebarCtrl', ['$scope', '$location', 'pageInfo', 'navMap', sidebarCtrl]);
