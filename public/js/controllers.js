var angular = require('angular');
var app = require('./modules/app');

//require controllers
var LessonCtrl = require('./controllers/LessonCtrl');
var LessonListCtrl = require('./controllers/LessonListCtrl');
var EditLessonCtrl = require('./controllers/EditLessonCtrl');
var ViewLessonCtrl = require('./controllers/ViewLessonCtrl');
var ProfileCtrl = require('./controllers/ProfileCtrl');
var TutorialCtrl = require('./controllers/TutorialCtrl');

app.controller('WelcomeCtrl', ['$scope', function($scope){

}]);

app.controller('AboutCtrl', ['$scope', function($scope){

}])

.controller('DashboardCtrl', ['$scope', '$firebase', 'User',
  function($scope, $firebase, User){
    User.$bind($scope, "user");
}])

.controller('HighscoreCtrl', ['$scope', '$firebase', 'Highscore',
  function($scope, $firebase, Highscore){
    Highscore.$bind($scope, "highscore");
}])

.controller('UserCtrl', ['$scope', '$firebase', 'User', '$rootScope', function($scope, $firebase, User, $rootScope){
  $rootScope.$watch('auth.user', function(){
    var user = $rootScope.auth.user;
    if(user !== null){
      User.$child(user.uid).$bind($scope, "user");
    }
  });
}])

.controller('UserPointsCtrl', ['$scope', '$firebase', 'User', '$rootScope', function($scope, $firebase, User, $rootScope){
  $rootScope.$watch('auth.user', function(){
    var user = $rootScope.auth.user;
    if(user !== null){
      User.$child(user.uid).$bind($scope, "user");
    }
  });
}])

.controller('LoginCtrl',
  ['$scope', '$firebase',
  function($scope, $firebase) {
}])

.controller('NewLessonCtrl', ['$scope', '$routeParams', 'Lessons', '$location', function($scope, $routeParams, Lessons, $location){
  Lessons.all.$bind($scope, 'lessons');


  $scope.addLesson = function() {
    $scope.lessons[$scope.lesson.slug] = $scope.lesson;
    $location.path('/lessons/' + $scope.lesson.slug);
  };

}]);
