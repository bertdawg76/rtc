angular.module('jwt-auth').factory('auth', function ($http, $window) {

    var auth = {
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        register: register,
        logIn: logIn,
        logOut: logOut
    };

    return auth;

    function saveToken(token) {
        if(token){
          $window.localStorage['rtc-token'] = token;   
        }
      
    }

    function getToken() {
        return $window.localStorage['rtc-token'];
    }

    function isLoggedIn() {
        var token = auth.getToken();

        if (token) {
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    function currentUser() {
        if(auth.isLoggedIn()){
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.username;
        } 
        //do else 
    }

    function register(user){
        return $http.post('/api/users/register', user).success(function(data){
            auth.saveToken(data.token);
        }).error(function(err) {
            console.log(err);
        });
    }

    function logIn(user){
        return $http.post('/api/users/login', user).success(function(data){
            
            auth.saveToken(data.token);
        });
    }

    function logOut(){
        $window.localStorage.removeItem('rtc-token');
    }

});