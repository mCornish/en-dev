function footerCtrl($scope) {

    var self = this;

    this.date = new Date();  // Allows footer year to update automatically

}

angular.module('app').controller('footerCtrl', ['$scope', footerCtrl]);
