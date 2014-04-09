// Frontend libraries
require('./vendor/jquery/jquery-2.1.0');
require('./vendor/bootstrap/js/bootstrap.js');

// Core libraries
require('./vendor/angular/angular');
require('./vendor/angular/angular-route');
// require('./vendor/angular-route-security/module.routeSecurity');
require('./vendor/firebase/firebase');
require('./vendor/firebase/simple-login/facebook');
require('./vendor/angularfire/angularfire');


var app = angular.module('app', ['firebase', 'ngRoute']) // 'routeSecurity'
.value('firebaseUrl', 'https://mylessons.firebaseio.com/')
.constant('loginRedirectPath', '/')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'WelcomeCtrl',
      templateUrl: 'templates/welcome.html'
    })    
    .when('/dashboard', {
      authRequired: true,
      controller: 'DashboardCtrl',
      templateUrl: 'templates/dashboard.html'
    })
    .when('/lessons/:lessonid', {
      authRequired: true,
      controller: 'LessonCtrl',
      templateUrl: 'templates/lesson.html'
    })
    .when('/lessons/:lessonid/edit', {
      authRequired: true,
      controller: 'EditLessonCtrl',
      templateUrl: 'templates/editlesson.html'
    })
    .when('/lessons', {
      authRequired: true,
      controller: 'LessonsListCtrl',
      templateUrl: 'templates/lessons.html'
    })
    .when('/user', {
      authRequired: true,
      controller: 'UserCtrl',
      templateUrl: 'templates/user.html'
    })
    .otherwise({
      redirectTo: '/fail'
    });
}])
.factory('LoginHandler', 
  ['$firebaseSimpleLogin', 'firebaseUrl', '$rootScope', 
  function($firebaseSimpleLogin, firebaseUrl, $rootScope){
    var data = {
      auth: {}
    }
    var ref = new Firebase(firebaseUrl);
    data.auth = $firebaseSimpleLogin(ref);
    $rootScope.auth = $firebaseSimpleLogin(ref);

    return data;

}])

.run(['$rootScope', '$location', 'LoginHandler', function($rootScope, $location, LoginHandler) {
    // register listener to watch route changes
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
      // if(typeof LoginHandler.auth.user.uid === "undefined"){
        // console.log(LoginHandler.auth);
        // $location.path( "/" );
      // }
    });
 }])

.factory('Lessons', ['$firebase', 'firebaseUrl', 
  function($firebase, firebaseUrl) {
    var lessens = $firebase(new Firebase(firebaseUrl + 'lessons'));

    return {
      all: lessens,
      choose: function(id){
        return $firebase(new Firebase(firebaseUrl + 'lessons' + '/' + id));
      }
    };
}])

.factory('User', ['$firebase', 'firebaseUrl', '$rootScope', 
  function($firebase, firebaseUrl, $rootScope) {
    return $firebase(new Firebase(firebaseUrl + 'users/' + 'kevin'));
}])

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

}])

.controller('EditLessonCtrl', ['$scope', '$routeParams', 'Lessons', function($scope, $routeParams, Lessons){
  $scope.id = $routeParams.lessonid;
  Lessons.choose($scope.id).$bind($scope, 'lesson');

}])

.controller('LessonsListCtrl', ['$scope', 'Lessons', function($scope, Lessons){
  Lessons.all.$bind($scope, 'lessons');

}])

