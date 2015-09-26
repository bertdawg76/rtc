angular.module('jwt-auth').controller('questionCtrl', function ($scope, questionService, $filter, $stateParams) {

  $scope.addQuestion = function(question) {
      console.log(question)
        questionService.addQuestion(question).then(function(response) {
            console.log(response);
        });
        
        $scope.question = '';
    };

 

});



  //Scope Functions / Scope API
  /*$scope.addQuestion = addQuestion;
  $scope.getQuestion = getQuestion;
  //$scope.showAddQuestionModal = showAddQuestionModal;


  function addQuestion(question) {
    questionService.addQuestion(question)
        .then(function (res) {
          console.log('Res', res);
        })
  }

  function getQuestion() {
    questionService.getQuestion().then(function (data) {
      $scope.questions = data;
    });
  }

 /* function showAddQuestionModal($event) {
    var $body = $(document.body);
    var hide = $mdDialog.show({
      parent: $body,
      targetEvent: $event,
      templateUrl: '/questionModal.html',
      controller: ModalController
    });

    hide.then(function (data) {
      var question = {
        name: data[0],
        description: data[1]
        
      };
      addQuestion(question);
    });

    function ModalController($scope, $mdDialog) {

     

      $scope.closeDialog = function () {
        $mdDialog.hide(23);
      };

      $scope.saveLog = function () {
        $mdDialog.hide([$scope.question.name, $scope.question.description]);
      };
    }
  }


 /*console.log("stateParams", $stateParams);

  //Do Lots Of THings with $stateParams.countryCode
 //put $stateParams back in top
  // //API
  $scope.addQuestion = addQuestion;
  $scope.getQuestion = getQuestion;
  $scope.getMatches = getMatches;

  init();

  function init(){
    getQuestion();
  }

  function addQuestion(question) {
    questionService.addQuestion(question).then(function (res) {

    });
  }

  function getQuestion() {
    questionService.getQuestion().then(function (data) {
      $scope.countries = data;
    });
  }

  function getMatches(text){
    return $filter('filter')($scope.questions, text);
  }*/

