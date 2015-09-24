angular.module('rtc', ['ui.router', 'ngAnimate', 'ngAria', 'ngMaterial', 'angular-web-notification', 'angular-growl']);

angular.module('rtc').config(function($urlRouterProvider, $stateProvider){

  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('rtcView', {
      url: '/',
      templateUrl: 'webRTC/rtcView.html',
      controller: 'rtcCtrl'
    })
    .state('note', {
      url: '/note',

      templateUrl: 'notification/note.html',
      controller: 'noteCtrl'
    })
    .state('question', {
      url: '/question',
      templateUrl: 'questions/question.html',
      controller: 'questionCtrl'
    })
    .state('user', {
      url: '/user',
      templateUrl: 'users/user.html',
      controller: 'userCtrl'
    })
});


