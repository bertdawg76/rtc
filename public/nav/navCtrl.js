angular.module('jwt-auth').controller('NavCtrl', function ($scope, $location, auth) {
  $scope.tabs = [
    
    {label: "question", url: 'question'},
    {label: "login", url: 'login'},
    {label: "register", url: 'register'}
  


  ];

  $scope.goToTab = goToTab;
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

  function goToTab(tab) {
  	$location.url("/" + tab.url);
  };



});