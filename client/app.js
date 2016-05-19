'use strict';

angular.module('app', [
  'ngRoute',
  'app.dashboard',
  'app.component.uploader',
  'app.component.videosrc',
  'app.component.progressbar',
  'app.component.notification'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/dashboard'
  })
}]);
