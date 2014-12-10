function BrowserCtrl($scope, pageInfo) {

    var self = this;

    self.getPage = function() {
        return pageInfo.getPartial();
    };

}

angular.module('app').controller('BrowserCtrl', ['$scope', 'pageInfo', BrowserCtrl]);
