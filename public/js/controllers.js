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

.controller('LessonCtrl', ['$scope', '$routeParams', 'Lessons', function($scope, $routeParams, Lessons){
  $scope.id = $routeParams.lessonid;
  Lessons.choose($scope.id).$bind($scope, 'lesson');

  $scope.getTemplateUrl = function(type) {
    return '/templates/media/' + type + '.html';
  };

}])

.controller('EditLessonCtrl', ['$scope', '$routeParams', 'Lessons', function($scope, $routeParams, Lessons){
  $scope.id = $routeParams.lessonid;
  Lessons.choose($scope.id).$bind($scope, 'lesson');

}])

.controller('NewLessonCtrl', ['$scope', '$routeParams', 'Lessons', function($scope, $routeParams, Lessons){
  Lessons.all.$bind($scope, 'lessons');

  $scope.addLesson = function() {
    $scope.lessons[$scope.lesson.slug] = $scope.lesson;
  };

}])

.controller('LessonsListCtrl', ['$scope', 'Lessons', '$location', function($scope, Lessons, $location){
  Lessons.all.$bind($scope, 'lessons');

  $scope.goToLesson = function(id, name) {
    $location.path('/lessons/' + id);
  };

}])