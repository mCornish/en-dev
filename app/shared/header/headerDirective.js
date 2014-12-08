function myHeader() {
    return {
      restrict: 'AE',
      replace: 'true',
      controller: 'headerCtrl',
      controllerAs: 'header',
      templateUrl: 'app/shared/header/headerView.html'
    };
}

angular.module('app').directive('myHeader', myHeader);
