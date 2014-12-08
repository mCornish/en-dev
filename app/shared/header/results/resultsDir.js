function results() {
    return {
      restrict: 'AE',
      replace: 'true',
      controller: 'resultsCtrl',
      controllerAs: 'results',
      templateUrl: 'app/shared/header/results/resultsView.html'
    };
}

angular.module('app').directive('results', results);
