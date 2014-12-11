function toggleList() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/shared/toggle/toggleView.html'
    };
}

angular.module('app').directive('toggleList', toggleList);
