angular.module('jwt-auth').service('questionService', function($http, $q){

	var questions =[];

	this.getQuestion = function (code) {
		var dfd = $q.defer();
		$http({
			method: 'GET',
			url: '/api/questions'
		}).then(function (response) {
			console.log(response.data);
			dfd.resolve(response.data);
		}, function (error) {
			console.log('error: ' + error);
		});
		return dfd.promise;
	};

	this.addQuestion = function(body) {

        var dfd = $q.defer();
            $http({
                method: 'POST',
                url: '/api/questions',
                data: body
            }).then(function (response) {
            	console.log(response.data);
                dfd.resolve(response.data);
                
            }, function (error) {
            	console.log('error: ' + error);
            });
            return dfd.promise;

        
    };

	
});