function browser() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'app/shared/info/browserView.html'
    };
}

angular.module('app').directive('my-browser', browser);
