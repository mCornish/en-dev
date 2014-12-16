angular.module('app', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    // Home
    .when('/', {
        templateUrl: 'app/components/home/homeView.html',
        controller: ''})
    // Overview
    .when('/overview', {
        templateUrl: 'app/shared/browser/browserView.html',
        controller: 'BrowserCtrl',
        controllerAs: 'browser'})
    .when('/overview/:page', {
        templateUrl: 'app/shared/browser/browserView.html',
        controller: 'BrowserCtrl as browser',
        controllerAs: 'browser'})
    // Sync API
    .when('/sync', {
        templateUrl: 'app/shared/browser/browserView.html',
        controller: 'BrowserCtrl as browser',
        controllerAs: 'browser'})
    .when('/sync/:page', {
        templateUrl: 'app/shared/browser/browserView.html',
        controller: 'BrowserCtrl as browser',
        controllerAs: 'browser'})
    // Thrift API
    .when('/thrift', {
        templateUrl: 'app/shared/browser/browserView.html',
        controller: 'BrowserCtrl as browser',
        controllerAs: 'browser'})
    .when('/thrift/:page', {
        templateUrl: 'app/shared/browser/browserView.html',
        controller: 'BrowserCtrl as browser',
        controllerAs: 'browser'})
    // Resources
    .when('/resources', {
        templateUrl: 'app/shared/browser/browserView.html',
        controller: 'BrowserCtrl as browser',
        controllerAs: 'browser'})
    .when('/resources/:page', {
        templateUrl: 'app/shared/browser/browserView.html',
        controller: 'BrowserCtrl as browser',
        controllerAs: 'browser'})
    // Status
    .when('/status', {
        templateUrl: 'app/components/status/statusView.html',
        controller: 'StatusCtrl as status'})
    // Sandbox
    .when('/sandbox', {
        templateUrl: 'app/components/sandbox/sandboxView.html',
        controller: 'SandboxCtrl as sandbox'})
    // Redirect
    .otherwise({
        redirectTo: '/'
  });
}]);
