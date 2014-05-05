var angular = require('angular');
var app = require('../modules/app')

.controller('LessonsListCtrl', ['$scope', 'Lessons', '$location', 'LessonDefaultValues', 'Quiz', '$rootScope', function($scope, Lessons, $location, LessonDefaultValues, Quiz, $rootScope){
  $scope.types = LessonDefaultValues.types;
  $scope.levels = LessonDefaultValues.levels;
  $scope.lessons = Lessons.all;

  $scope.lessons.$on('loaded', function(){
    angular.forEach($scope.lessons, function(item, slug){
      if(slug.indexOf('$') == 0) return;
      Quiz.hasUserTakenQuiz($rootScope.auth.user.uid, slug, function(result){
        $scope.lessons[slug].quizTaken = result;
      });
    });
  });

  var temp = 'http://www.ac4d.com/blog/uploads/2011/04/jonKolko.jpg';
  $scope.getStyles = function(lesson) {
    if(lesson.picture){
      return {
        'background': 'url(' + lesson.thumbnail + ')',
        'background-size': '100%'
      };
    } else {
      return {
        'background': 'url(' + temp + ')',
        'background-size': '100%'
      };
    }
  };

  $scope.goToLesson = function(id, name) {
    $location.path('/lessons/' + id);
  };

  $scope.shortenLessonname = function(name) {
    if(!name) return;
    if(name.length < 55){
      return name;
    } else {
      return name.substring(0, 55) + '..';
    }
  };

}])