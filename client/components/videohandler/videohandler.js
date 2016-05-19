'use strict';

angular.module('app.component.videosrc', [])
    .directive('videohandler', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                videosrc: '@'
            },
            link: function(scope, element, attrs) {
              scope.$watch('videosrc', function(newVid) {
                if (newVid) {
                  attrs.$set('src', attrs.videosrc)
                }
              });
            }
        };
    });
