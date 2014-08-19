var express = require('express');
var logfmt = require('logfmt');
var app = express();
var fork = require('child_process').fork;

app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 9000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});

var highscore_worker = fork('highscore.js');
app.get('/workerstatus', function(req, res) {
	highscore_worker.send({'task': 'status'});
	highscore_worker.once('message', function(status) {
		res.send(status);
	});
});
