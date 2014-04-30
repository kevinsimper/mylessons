var Firebase = require('Firebase');
var rootRef = new Firebase('http://mylessons.firebaseio.com/');

console.log('Starter HighScore worker')

var highscore = [];
rootRef.child('users').on('value', function(snapshot){
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
  rootRef.child('highscore').set(highscore);
  console.log('Highscore updated');
});
// console.log(highscore);
