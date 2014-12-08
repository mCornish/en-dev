angular.module('app', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    // Home
    .when('/', {templateUrl: 'app/components/home/homeView.html', controller: ''})
    // Overview
    .when('/overview', {
      templateUrl: 'app/shared/browser/browserView.html',
      controller: 'browserCtrl as browser'})
    .when('/overview/:page', {
      templateUrl: 'app/shared/browser/browserView.html',
      controller: 'browserCtrl as browser'})
    // Sync API
    .when('/sync', {
      templateUrl: 'app/shared/browser/browserView.html',
      controller: 'browserCtrl as browser'})
    .when('/sync/:page', {
      templateUrl: 'app/shared/browser/browserView.html',
      controller: 'browserCtrl as browser'})
    // Thrift API
    .when('/thrift', {
      templateUrl: 'app/shared/browser/browserView.html',
      controller: 'browserCtrl as browser'})
    .when('/thrift/:page', {
      templateUrl: 'app/shared/browser/browserView.html',
      controller: 'browserCtrl as browser'})
    // Resources
    .when('/resources', {
      templateUrl: 'app/shared/browser/browserView.html',
      controller: 'browserCtrl as browser'})
    .when('/resources/:page', {
      templateUrl: 'app/shared/browser/browserView.html',
      controller: 'browserCtrl as browser'})
    // Status
    .when('/status', {
      templateUrl: 'app/components/status/statusView.html',
      controller: 'statusCtrl as status'})
    // Sandbox
    .when('/sandbox', {
      templateUrl: 'app/components/sandbox/sandboxView.html',
      controller: 'sandboxCtrl as sandbox'})
    // Redirect
    .otherwise({
      redirectTo: '/'
  });
}]);
