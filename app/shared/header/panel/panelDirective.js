function apiPanel() {
    return {
      restrict: 'AE',
      replace: 'true',
      controller: 'PanelCtrl',
      controllerAs: 'panel',
      templateUrl: 'app/shared/header/panel/panelView.html'
    };
}

angular.module('app').directive('apiPanel', apiPanel);
