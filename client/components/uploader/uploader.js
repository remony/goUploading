'use strict';

angular.module('app.component.uploader', [])
    .directive('uploader', function($timeout) {
        return {
            // restrict: 'E',
            scope: {
                uploader: '='
            },
            templateUrl: 'components/uploader/uploader.html',
            link: function(scope, element, attrs) {
                function createObjectURL(object) {
                    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
                }
                element.bind('change', function(change) {
                    console.log(change.target.files[0]);
                    $timeout(function() {
                      scope.uploader = change.target.files[0];
                      scope.uploader.image = createObjectURL(change.target.files[0])

                    })


                })
            }
        };
    });
