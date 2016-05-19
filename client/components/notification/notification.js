'use strict';

angular.module('app.component.notification', [])
    .directive('notification', function($timeout) {
        return {
            restrict: 'E',
            scope: {
                data: '@'
            },
            templateUrl: 'components/notification/notification.html',
            link: function(scope, element, attrs) {
              element.addClass('hide');
              element.removeClass('show');
              scope.progressStyles = {};
                scope.$watch('data', function(newProgress) {
                  if (newProgress) {
                    console.log(JSON.parse(attrs.data).type)
                    if (JSON.parse(attrs.data).type === 'success') {
                      $timeout(function() {

                        element.addClass('hide');
                        element.removeClass('show');
                      })
                      $timeout(function () {
                        element.addClass('show');
                        element.removeClass('hide');
                        scope.link = JSON.parse(attrs.data).link;
                      }, 10);
                    } else {
                      $timeout(function() {
                      element.addClass('hide');
                      element.removeClass('show');
                    })
                    }
                  }
                })
            }
        };
    });
