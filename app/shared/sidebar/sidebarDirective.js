function sidebar() {
    return {
      restrict: 'AE',
      replace: 'true',
      controller: 'sidebarCtrl',
      controllerAs: 'sidebar',
      templateUrl: 'app/shared/sidebar/sidebarView.html'
    };
}

angular.module('app').directive('sidebar', sidebar);
