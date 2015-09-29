angular.module('jwt-auth').controller('NavCtrl', function ($scope, $location, auth, socketService, noteService) {
  $scope.tabs = [
    {label: "question", url: '/'},
    {label: "login", url: 'login'},
    {label: "register", url: 'register'}
  ];

  $scope.goToTab = goToTab;
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;

  $scope.sendMessage = sendMessage;
  initSocket();
  

  function goToTab(tab) {
  	$location.url("/" + tab.url);
  };

  function initSocket(){
    socketService.connect();
    socketService.emit('heart_beat', {user: auth.currentUser()});
    socketService.on('question_added', handleQuestionAdded);
    socketService.on('getting_realz', handleRealz);
  }
 
  function handleQuestionAdded(){
    console.log('Question added: ', arguments);
  }

  function handleRealz(data){
    console.log('this is realz', data, arguments);
    noteService.notify({
      title: 'GET REALZ',
      body: "You should get real, "+ $scope.currentUser() +"!",
      icon: noteService.ICONS.ALERT1
    });
  }

  function sendMessage(){
    socketService.emit('rob_is_awesome', {foo:'bar'});
  }

});

/*.controller('NavCtrl', [
'$scope',
'auth',
function($scope, auth){
  $scope.isLoggedIn = auth.isLoggedIn;
  $scope.currentUser = auth.currentUser;
  $scope.logOut = auth.logOut;
}]);*/