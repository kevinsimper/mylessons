var app = require('./modules/app');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'WelcomeCtrl',
      templateUrl: 'templates/welcome.html'
    })
    .when('/about', {
      controller: 'AboutCtrl',
      templateUrl: 'templates/about.html'
    })
    .when('/dashboard', {
      authRequired: true,
      controller: 'DashboardCtrl',
      templateUrl: 'templates/dashboard.html'
    })
    .when('/highscore', {
      authRequired: true,
      controller: 'HighscoreCtrl',
      templateUrl: 'templates/highscore.html'
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
    .when('/lessons/:lessonid/view', {
      authRequired: true,
      controller: 'ViewLessonCtrl',
      templateUrl: 'templates/viewlesson.html'
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
    .when('/profile/:user', {
      authRequired: true,
      controller: 'ProfileCtrl',
      templateUrl: 'templates/profile.html'
    })
    .when('/tutorial', {
      authRequired: true,
      controller: 'TutorialCtrl',
      templateUrl: 'templates/tutorial.html'
    })
    .when('/suggest', {
      authRequired: true,
      controller: 'SuggestCtrl',
      templateUrl: 'templates/suggest.html'
    })
    .when('/admin', {
      authRequired: true,
      controller: 'AdminCtrl',
      templateUrl: 'templates/admin/index.html'
    })
    .otherwise({
      redirectTo: '/fail'
    });
}]);
