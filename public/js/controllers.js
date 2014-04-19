var app = require('./modules/app')

.controller('WelcomeCtrl', ['$scope', function($scope){

}])

.controller('DashboardCtrl', ['$scope', '$firebase', 'User',
  function($scope, $firebase, User){
    User.$bind($scope, "user");
    $scope.name = 'Kevin';
}])

.controller('UserCtrl', ['$scope', '$firebase', 'User', function($scope, $firebase, User){
    User.$bind($scope, "user");
}])

.controller('LoginCtrl', 
  ['$scope', '$firebase', 
  function($scope, $firebase) {
}])

.controller('LessonCtrl', ['$scope', '$routeParams', 'Lessons', '$location', function($scope, $routeParams, Lessons, $location){
  $scope.id = $routeParams.lessonid;
  Lessons.choose($scope.id).$bind($scope, 'lesson');

  $scope.getTemplateUrl = function(type) {
    if(type){
      return '/templates/media/' + type + '.html'; 
    } else {
      return '';
    }
  };

  $scope.deleteLesson = function() {
    alert('Sletter ' + $scope.id);
    Lessons.delete($scope.id);
    $location.path('/lessons');
  };

  $scope.editLesson = function(){
    $location.path('/lessons/' + $scope.lesson.slug + '/edit');
  };
}])

.controller('EditLessonCtrl', ['$scope', '$routeParams', 'Lessons', '$location', function($scope, $routeParams, Lessons, $location){
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
        answer: 'Answer',
        correct: false
      };
      questions.$child(ref.name()).$child('answers').$add(answer);
      questions.$child(ref.name()).$child('answers').$add(answer);
      questions.$child(ref.name()).$child('answers').$add(answer);
    });
  };

}])

.controller('NewLessonCtrl', ['$scope', '$routeParams', 'Lessons', '$location', function($scope, $routeParams, Lessons, $location){
  Lessons.all.$bind($scope, 'lessons');


  $scope.addLesson = function() {
    $scope.lessons[$scope.lesson.slug] = $scope.lesson;
    $location.path('/lessons/' + $scope.lesson.slug);
  };

}])

.controller('LessonsListCtrl', ['$scope', 'Lessons', '$location', function($scope, Lessons, $location){
  Lessons.all.$bind($scope, 'lessons');

  $scope.getStyles = function(lesson) {
    if(lesson.picture){
      return {
        'background': 'url(' + lesson.picture + ')'
      };
    } else {
      return {};
    }
  };

  $scope.goToLesson = function(id, name) {
    $location.path('/lessons/' + id);
  };

}])