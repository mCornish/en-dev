function panelCtrl($scope) {
    $scope.submit = function() {
        console.log('submit');
        angular.element('#js-api-container').fadeOut(500);
        angular.element('#js-loader').delay(500).fadeIn(500, function() {
            angular.element('#js-loader').delay(5000).fadeOut(500, function() {
                angular.element('#js-api-confirm').fadeIn(1500, function() {
                    angular.element('#key-btn').removeClass('active');
                    angular.element('#js-api-panel').toggleClass('active');
                });
            });
        });
    };
}

angular.module('app').controller('panelCtrl', ['$scope', panelCtrl]);
