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

    return $rootScope.auth;

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

app.factory('Highscore', ['$firebase', 'firebaseUrl', '$rootScope',
  function($firebase, firebaseUrl, $rootScope) {
    return $firebase(new Firebase(firebaseUrl + 'highscore/'));
}])

app.factory('Quiz', ['$firebase', 'firebaseUrl', '$rootScope',
  function($firebase, firebaseUrl, $rootScope) {
    // return $firebase(new Firebase(firebaseUrl + 'users/'));
    return {
      addPointsToUser: function(user, lesson, lessonSlug, points) {
        var fbRef = $firebase(new Firebase(firebaseUrl + 'users/'));
        var userRef = fbRef.$child(user);
        userRef.$child('quizTaken' + '/' + lessonSlug).$set(true);
        userRef.$child('pointsTotal').$set((parseInt(userRef.pointsTotal) + parseInt(points)).toString());
        var userPointsRef = userRef.$child('points');
        userPointsRef.$add({
          points: points,
          name: lesson
        });
        return userPointsRef;
      },
      hasUserTakenQuiz: function(user, lessonSlug, callback) {
        var fbRef = $firebase(new Firebase(firebaseUrl + 'users/'));
        var userRef = fbRef.$child(user);
        var quizTakenRef = userRef.$child('quizTaken' + '/' + lessonSlug);
        quizTakenRef.$on("loaded", function(){
          var result = false;
          if(quizTakenRef.$value == true){
            result = true;
          }
          callback(result);
        });
      }
    };
}])
