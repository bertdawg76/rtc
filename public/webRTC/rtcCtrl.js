
angular.module('rtc').controller('rtcCtrl', function($scope, $sce, $mdToast, growl, rtcService) {

    $scope.captureVideo = captureVideo; 
   


    function captureVideo() {
    rtcService.get().then(function(stream) {
      console.log('starting video', stream);
      window.stream = stream; 
      if (window.URL) {
        console.log('using window.URL');
        $scope.videostream = $sce.trustAsResourceUrl(window.URL.createObjectURL(stream));
      } else {
        $scope.videostream = $sce.trustAsResourceUrl(stream);
      }
    });
  };

  $scope.openToast = function($event) {
    $mdToast.show($mdToast.simple().content('Hello!'));
    // Could also do $mdToast.showSimple('Hello');
  };
  $scope.dynamicText = '';
    $scope.triggerCallbacks = function() {
      growl.warning("Warning Message!", {
        onclose: function() {
          $scope.dynamicText = "Trigger Close!"
        },
        onopen: function() {
          $scope.dynamicText = "Trigger Open!"
        },
        ttl: 5000
      });
    };


});