var app = require('./modules/app');

app.factory('LoginHandler', 
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

app.factory('Lessons', ['$firebase', 'firebaseUrl', 
  function($firebase, firebaseUrl) {
    var lessens = $firebase(new Firebase(firebaseUrl + 'lessons'));

    return {
      all: lessens,
      choose: function(id){
        return lessens.$child(id);
      },
      delete: function(id){
        return lessens.$remove(id);
      }
    };
}])

app.factory('User', ['$firebase', 'firebaseUrl', '$rootScope', 
  function($firebase, firebaseUrl, $rootScope) {
    return $firebase(new Firebase(firebaseUrl + 'users/'));
}])

app.factory('Quiz', ['$firebase', 'firebaseUrl', '$rootScope', 
  function($firebase, firebaseUrl, $rootScope) {
    // return $firebase(new Firebase(firebaseUrl + 'users/'));
    return {
      addPointsToUser: function(user, lesson, points) {
        var fbRef = $firebase(new Firebase(firebaseUrl + 'users/'));
        var userPointsRef = fbRef.$child(user + '/points');
        userPointsRef.$add({
          points: points,
          name: lesson
        });
        return userPointsRef;
      }
    };
}])