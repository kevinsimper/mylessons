var Firebase = require('Firebase');
var localconfig = require('./localconfig');

var rootRef = new Firebase(localconfig.localFirebase);
var highscoreRef = rootRef.child('highscore');

console.log('Starter HighScore worker')

rootRef.child('users').on('value', function(snapshot){
  var highscore = [];
  var data = snapshot.val();
  for(key in data){
    _person = data[key];

      console.log(_person.name)
      var person = {
        name: _person.name || 'Anonym',
        points: _person.pointsTotal || 0
      };
      highscore.push(person);
  }
  highscore.sort(function(a, b){
    return b.points - a.points;
  });
  highscoreRef.set(highscore);
  console.log('Highscore updated');
});
