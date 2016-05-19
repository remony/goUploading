'use strict';

angular.module('app.dashboard', ['ngRoute'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'dashboardCtrl'
      });
    }
  ])
  .controller('dashboardCtrl', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
    $scope.message = 'hello';
    $scope.previewstyles = {};

    $scope.notification = {};

    $scope.uploadStatus = {
      'loaded': 0,
      'total': 0,
      'percent': 0
    }

    function updateProgress(event) {
      if (event.lengthComputable) {
        // console.log(event.loaded)
        // console.log(event.total)
        $timeout(function() {
          $scope.uploadStatus = {
            'loaded': event.loaded,
            'total': event.total,
            'percent': (event.loaded / event.total * 100)
          }
        })
        // console.log($scope.uploadStatus)
          // ...
      } else {
        console.log('unable')
          // Unable to compute progress information since the total size is unknown
      }
    }

    function transferComplete(event) {
      $timeout(function() {
        $scope.notificationdata = {
          'link': 'http://localhost:9000/data/' + $scope.fileinfo.name,
          'type': 'success'
        }
      })
    }

    function transferFailed(event) {
      // console.log('failed')
    }

    function transferCanceled(event) {
      // console.log('canceled')
    }

    function transferStart(event) {
      // console.log('started')
      $timeout(function() {
        $scope.notificationdata = {
          "link": undefined,
          "type": "none"
        };
      })
    }

    function upload(file) {
      if (file) {
        var uploadUrl = 'http://localhost:9000/api/v1/files'
        var data = new FormData();
        data.append('file', file);
        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", updateProgress);
        xhr.addEventListener("load", transferComplete);
        xhr.addEventListener("error", transferFailed);
        xhr.addEventListener("abort", transferCanceled);
        xhr.addEventListener("start", transferStart);

        // xhr.onprogress = updateProgress

        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
          if (this.readyState === 4) {
            // console.log(this.responseText);
          }
        });

        xhr.open("POST", "http://localhost:9000/api/v1/files");
        xhr.send(data);


      }

    }

    $scope.$watch('file', function(newfile) {
      // console.log(newfile)
      if (newfile) {
        $scope.fileinfo = newfile;
        $scope.previewstyles = {
            'background': 'url(' + newfile.image + ') no-repeat center center fixed',
            '-webkit-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-size': 'cover'
          }
          //  detect images
        // console.log(newfile.type)


        if ($scope.fileinfo.type === 'image/jpeg' || $scope.fileinfo.type === 'image/gif' || $scope.fileinfo.type === 'image/png' || $scope.fileinfo.type === 'image/webp') {
          $scope.fileinfo.isImage = true;
          $scope.fileinfo.isVideo = false;
          $scope.fileinfo.isUnknown = false;
        } else if ($scope.fileinfo.type === 'video/mp4' || $scope.fileinfo.type === 'video/webm') {
          $scope.fileinfo.isImage = false;
          $scope.fileinfo.isVideo = true;
          $scope.fileinfo.isUnknown = true;
          $scope.videoinfo = {};
          $scope.videoinfo.src = newfile.image;
        } else {
          $scope.fileinfo.isImage = false;
          $scope.fileinfo.isVideo = false;
          $scope.fileinfo.isUnknown = true;
        }

      }

      upload(newfile);



    })

    function changePreview(file) {
      // console.log('File change detected')
      // console.log(file)
    }


    $scope.previewImage = function(file) {
      changePreview(file);
    }

    $scope.uploadFile = function(file) {
      console.log(file);
    }



  }]);
