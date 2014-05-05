var angular = require('angular');
var app = require('../modules/app')

.controller('LessonCtrl', ['$scope', '$routeParams', 'Lessons', '$rootScope', '$location', '$sce', 'Quiz', function($scope, $routeParams, Lessons, $rootScope, $location, $sce, Quiz){
  $scope.id = $routeParams.lessonid;
  Lessons.choose($scope.id).$bind($scope, 'lesson').then(function(){
    $scope.userQuiz = angular.copy($scope.lesson.quiz);

    // Set the URL if the lesson is a video
    if($scope.lesson.type === 'video'){
      $scope.setYoutubeEmbedUrl();
    }
    if($scope.lesson.type === 'event'){
      $scope.hideQuiz = true;
    }

    Quiz.hasUserTakenQuiz($rootScope.auth.user.uid, $scope.id, function(result){
      console.log(result);
      $scope.quizTaken = result;
    });
  });


  $scope.getTemplateUrl = function(type) {
    if(type){
      return '/templates/media/' + type + '.html';
    } else {
      return '';
    }
  };

  $scope.setYoutubeEmbedUrl = function() {
    var youtubeData = $scope.lesson.youtubelink.split('v=')
    $scope.youtubeEmbedUrl = $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + youtubeData[1]);
  };

  $scope.hideQuiz = false;

  $scope.deleteLesson = function() {
    alert('Sletter ' + $scope.id);
    Lessons.delete($scope.id);
    $location.path('/lessons');
  };

  $scope.editLesson = function(){
    $location.path('/lessons/' + $scope.lesson.slug + '/edit');
  };

  $scope.submitQuiz = function() {
    $scope.submittedQuiz = true;
    var questionNumbers = 0,
        errors = false,
        allCorrect = true;

    angular.forEach($scope.userQuiz.questions, function(val, key) {
      // Count the number of questions
      // because the object has no lenght
      questionNumbers++;
      // If the value has not been set
      // then the question has not been answered
      if(typeof val.checked === "undefined") {
        errors = true;
        return false;
      }

      // If not all is correct
      if(val.checked !== val.correct){
        allCorrect = false;
      }
    });

    // If NO errors occured in the form
    if(!errors){
      $scope.userQuiz.error = false;
      // if all answers is correct
      if(allCorrect){
        $scope.userQuiz.congrats = true;

        Quiz.addPointsToUser($rootScope.auth.user.uid, $scope.lesson.name, $scope.id, $scope.lesson.quiz.points);
      } else {
        $scope.userQuiz.failed = true;
      }
      // Defined that the question has been defined
      $scope.userQuiz.answered = true;
    } else {
      // If there was an error, show an msg
      $scope.userQuiz.error = true;
    }

  };

}])