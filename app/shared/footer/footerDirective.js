function footer() {
    return {
      restrict: 'AE',
      replace: 'true',
      controller: 'footerCtrl',
      controllerAs: 'footer',
      templateUrl: 'app/shared/footer/footerView.html'
    };
}

angular.module('app').directive('myFooter', footer);
