var Firebase = require('firebase');
var localconfig = require('./localconfig');

var rootRef = new Firebase(localconfig.localFirebase);
var highscoreRef = rootRef.child('highscore');

console.log('Starter HighScore worker')

rootRef.child('users').on('value', function(snapshot){
  var highscore = [];
  var data = snapshot.val();
  var refName = snapshot.name();
  for(key in data){
    _person = data[key];

    var person = {
      name: _person.name || 'Anonym',
      points: _person.pointsTotal || 0,
    };

    if(_person.facebookUsername){
      person.picture = 'http://graph.facebook.com/' + 
                _person.facebookUsername + 
                '/picture';
    } else {
      person.picture = 'http://graph.facebook.com/' + 
        key.split(':')[1] +
        '/picture';
    }
    highscore.push(person);
  }
  highscore.sort(function(a, b){
    return b.points - a.points;
  });
  highscoreRef.set(highscore);
  console.log('Highscore updated');
});
