function loader() {
    return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'app/shared/loader/loaderView.html'
    };
}

angular.module('app').directive('loader', loader);
