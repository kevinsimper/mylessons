var Firebase = require('Firebase');
var rootRef = new Firebase('http://mylessons.firebaseio.com/');
var highscoreRef = rootRef.child('highscore');

console.log('Starter HighScore worker')

rootRef.child('users').on('value', function(snapshot){
  var highscore = [];
  var data = snapshot.val();
  for(key in data){
    var person = {
      name: data[key].name,
      points: data[key].pointsTotal
    };
    highscore.push(person);
  }
  highscore.sort(function(a, b){
    return b.points - a.points;
  });
  highscoreRef.set(highscore);
  console.log('Highscore updated');
});