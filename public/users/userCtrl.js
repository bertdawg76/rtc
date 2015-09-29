angular.module('jwt-auth').controller('userCtrl', function($scope, $state, auth){
	$scope.user = {};

	$scope.register = function() {
		auth.register($scope.user).error(function(error){
			console.log($scope.user);
			$scope.error = error;
		}).then(function(){
			$state.go('question');
		});
	};

	$scope.logIn = function() {
		auth.logIn($scope.user).error(function(error){
			console.log($scope.user);
			$scope.error = error;
		}).then(function(){
			$state.go('question');
		});
    };
});