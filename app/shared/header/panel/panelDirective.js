function apiPanel() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'app/shared/header/panel/panelView.html'
    };
}

angular.module('app').directive('apiPanel', apiPanel);
