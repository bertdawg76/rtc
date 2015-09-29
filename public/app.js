angular.module('jwt-auth', ['ui.router', 'ngAnimate', 'ngAria', 'ngMaterial', 'angular-web-notification']);

angular.module('jwt-auth').config(function($urlRouterProvider, $stateProvider){

  $urlRouterProvider.otherwise('/');
  $stateProvider
    
    .state('question', {
      url: '/',
      templateUrl: 'question/question.html',
      controller: 'questionCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'users/login.html',
      controller: 'userCtrl',
      onEnter: function($state, auth) {
        if(auth.isLoggedIn()){
          $state.go('question');
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: 'users/register.html',
      controller: 'userCtrl',
      onEnter: function($state, auth) {
        if(auth.isLoggedIn()){
          $state.go('question');
        }
      }
    })
    
});



