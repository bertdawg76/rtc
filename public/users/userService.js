angular.module('jwt-auth').factory('auth', function ($http, $window) {

    var auth = {};

    auth.saveToken = function(token) {
        if(token){
          $window.localStorage['rtc-token'] = token;   
        }
      
    }

    auth.getToken = function() {
        return $window.localStorage['rtc-token'];
    }

    auth.isLoggedIn = function() {
        var token = auth.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    auth.currentuser = function() {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        }
    };

    auth.register = function(user){
        return $http.post('/register', user).success(function(data){
            auth.saveToken(data.token);
        }).error(function(err) {
            console.log(err);
        });
    };

    auth.logIn = function(user){
        return $http.post('/api/users', user).success(function(data){
            
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function(){
        $window.localStorage.removeItem('rtc-token');
    };

    return auth;
    
});