// Frontend libraries
require('jquery');
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
require('./js/directives/');
require('./js/factories');
require('./js/controllers');

var localconfig = require('../localconfig');

var app = require('./js/modules/app');

app.value('firebaseUrl', localconfig.localFirebase);

app.run(['$rootScope', '$location', 'LoginHandler', 'User', function($rootScope, $location, LoginHandler, User) {
  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    var userData = User.$child(user.uid);
    LoginHandler.user.data = userData;


    userData.$update({
      name: LoginHandler.user.displayName,
      loginType: LoginHandler.user.provider,
      facebookUsername: LoginHandler.user.thirdPartyUserData.username,
      lastLogin: Date.now()
    });

    // If first time log in
    if(!userData.pointsTotal){
      userData.$update({
        pointsTotal: 0
      });
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