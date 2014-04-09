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
      controller: 'LoginCtrl',
      templateUrl: 'templates/login.html'
    })    
    .when('/dashboard', {
      authRequired: true,
      controller: 'DashboardCtrl',
      templateUrl: 'templates/dashboard.html'
    })
    .otherwise({
      redirectTo: '/fail'
    })
}])
.factory('LoginHandler', 
  ['$firebaseSimpleLogin', 'firebaseUrl', 
  function($firebaseSimpleLogin, firebaseUrl){
    var data = {
      auth: {}
    }
    var ref = new Firebase(firebaseUrl);
    data.auth = $firebaseSimpleLogin(ref);

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

.controller('DashboardCtrl', ['$scope', '$firebase', 'LoginHandler',
  function($scope, $firebase, LoginHandler){
    $scope.name = 'Kevin';
    $scope.auth = LoginHandler.auth;
}])

.controller('LoginCtrl', 
  ['$scope', '$firebase', 'LoginHandler', 
  function($scope, $firebase, LoginHandler) {
    $scope.auth = LoginHandler.auth;
}])

.factory('Lessons', ['$firebase', 'firebaseUrl', 
  function($firebase, firebaseUrl) {
    return $firebase(new Firebase(firebaseUrl + 'lessons'));
}])
