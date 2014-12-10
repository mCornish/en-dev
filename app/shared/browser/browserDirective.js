function browser() {
    return {
      restrict: 'AE',
      replace: 'true',
      controller: 'BrowserCtrl',
      controllerAs: 'browser',
      templateUrl: 'app/shared/info/browserView.html'
    };
}

angular.module('app').directive('my-browser', browser);
