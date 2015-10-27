angular.module('jwt-auth').factory('socketService', function ($rootScope) {
  var socket;
  return {
    connect: function(){
      if(socket != undefined) return;
      socket = io.connect();
    },
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    off: function(eventName, cb){
      socket.removeListener(eventName, cb);
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});