'use strict';

angular.module('app.component.progressbar', [])
    .directive('progressbar', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                progress: '@'
            },
            templateUrl: 'components/progressbar/progressbar.html',
            link: function(scope, element, attrs) {
              scope.progressStyles = {};
                scope.$watch('progress', function(newProgress) {
                  if (newProgress) {
                    $timeout(function () {
                      scope.status = JSON.parse(attrs.progress);
                      scope.status.percent = Math.floor(scope.status.percent)
                      scope.progressStyles.width = JSON.parse(attrs.progress).percent + '%';
                    });

                  }
                })
            }
        };
    });
