function syncAuth() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/components/sync/partials/syncAuth.html'
    };
}
angular.module('app').directive('syncAuth', syncAuth);





function fullSync() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/components/sync/partials/fullSync.html'
    };
}
angular.module('app').directive('fullSync', fullSync);





function initialSync() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/components/sync/partials/initialSync.html'
    };
}
angular.module('app').directive('initialSync', initialSync);





function syncStatus() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/components/sync/partials/syncStatus.html'
    };
}
angular.module('app').directive('syncStatus', syncStatus);





function recoverySync() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/components/sync/partials/recoverySync.html'
    };
}
angular.module('app').directive('recoverySync', recoverySync);





function incrementalSync() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/components/sync/partials/incrementalSync.html'
    };
}
angular.module('app').directive('incrementalSync', incrementalSync);





function sendChanges() {
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'app/components/sync/partials/sendChanges.html'
    };
}
angular.module('app').directive('sendChanges', sendChanges);
