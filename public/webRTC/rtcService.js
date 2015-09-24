angular.module('rtc').service('rtcService', function($q) {
  
  navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  
  var constraints = {
    audio: true,
    video: true
  };
  
  var deferred = $q.defer();
  
  var get = function() {
    navigator.getUserMedia(
      constraints,
      function(stream) { deferred.resolve(stream); },
      function errorCallback(error) {
        console.log('navigator.getUserMedia error: ', error);
        deferred.reject(error);
      }
   	);
    
    return deferred.promise;
  }
  
  return {
    get: get
  }
  
});