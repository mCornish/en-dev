function browserCtrl($scope, pageInfo) {
    var self = this;

    self.getPage = function() {
        return pageInfo.getPartial();
    };
}

angular.module('app').controller('browserCtrl', ['$scope', 'pageInfo', browserCtrl]);
