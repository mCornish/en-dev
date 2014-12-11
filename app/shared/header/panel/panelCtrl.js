function PanelCtrl($scope) {

    var self = this;

    self.submitted = false;

    self.submit = function() {
        self.submitted = true;
        console.log('submit');
    };

    self.tosError = false;

}

angular.module('app').controller('PanelCtrl', ['$scope', PanelCtrl]);
