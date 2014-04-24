var app = require('./modules/app');

app.config(['$routeProvider', function($routeProvider) {
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
    .when('/lessons/new', {
      authRequired: true,
      controller: 'NewLessonCtrl',
      templateUrl: 'templates/newlesson.html'
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
    .when('/user/points', {
      authRequired: true,
      controller: 'UserPointsCtrl',
      templateUrl: 'templates/userpoints.html'
    })    
    .otherwise({
      redirectTo: '/fail'
    });
}])