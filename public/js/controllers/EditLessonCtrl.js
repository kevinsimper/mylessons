var angular = require('angular');
var app = require('../modules/app')

.controller('EditLessonCtrl', ['$scope', '$routeParams', 'Lessons', '$location', 'LessonDefaultValues', function($scope, $routeParams, Lessons, $location, LessonDefaultValues){
  $scope.types = LessonDefaultValues.types;
  $scope.levels = LessonDefaultValues.levels;
  $scope.id = $routeParams.lessonid;
  var lesson = Lessons.choose($scope.id);
  lesson.$bind($scope, 'lesson');

  $scope.removeQuestion = function(name) {
    console.log(name)
    var question = lesson.$child('quiz/questions').$remove(name);
    // console.log($scope.lesson.quiz.questions.indexOf(lesson));
  };
  $scope.addQuestion = function() {
    var questions = lesson.$child('quiz/questions');
    var question = {
      question: 'New question'
    };
    questions.$add(question).then(function(ref){
      var answer = {
        answer: 'Answer'
      };
      questions.$child(ref.name()).$child('answers').$add(answer);
      questions.$child(ref.name()).$child('answers').$add(answer);
      questions.$child(ref.name()).$child('answers').$add(answer);
    });
  };

}])