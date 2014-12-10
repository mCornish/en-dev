function PanelCtrl($scope) {

    var self = this;

    self.submitted = false;

    self.submit = function() {
        self.submitted = true;
        console.log('submit');
    };

}

angular.module('app').controller('PanelCtrl', ['$scope', PanelCtrl]);
