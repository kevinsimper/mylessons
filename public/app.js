// Frontend libraries
require('./vendor/jquery/jquery-2.1.0');
require('./vendor/bootstrap/js/bootstrap.js');

// Core libraries
require('angular');
require('./vendor/angular/angular-route');
require('./vendor/angular-route-security/module.routeSecurity');
require('./vendor/firebase/firebase');
require('./vendor/firebase/simple-login/facebook');
require('./vendor/angularfire/angularfire');

require('./js/config');
require('./js/routes');
require('./js/factories');
require('./js/controllers');

var localconfig = require('../localconfig');

var app = require('./js/modules/app');

app.value('firebaseUrl', localconfig.localFirebase);

app.run(['$rootScope', '$location', 'LoginHandler', 'User', function($rootScope, $location, LoginHandler, User) {

  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    if(LoginHandler.user !== null){
      LoginHandler.user.data = User.$child(user.uid);
    }
  });

  // register listener to watch route changes
  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    // if(typeof LoginHandler.auth.user.uid === "undefined"){
      // console.log(LoginHandler.auth);
      // $location.path( "/" );
    // }
  });
}]);