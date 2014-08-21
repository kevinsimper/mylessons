var express = require('express');
var logfmt = require('logfmt');
var app = express();
var fork = require('child_process').fork;
var request = require('request');
var bodyParser = require('body-parser')

app.use(logfmt.requestLogger());
app.use(bodyParser.urlencoded({extended: true}))
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

app.post('/events/quiz', function(req, res) {
	var token = 'GPk9YdzD0r8DFPY8qzCdRvpu';
	var url = 'https://wisr.slack.com/services/hooks/incoming-webhook?token=';
	if('production' === process.env.NODE_ENV || req.body.test){
		var profile = req.body.profile;
		var user = req.body.user;
		var link = req.body.link;
		var quiz = req.body.quiz;
		var message = {
			text: '<'+profile+'|'+user+'> took the <'+link+'|'+quiz+'> quiz'
		};
		request.post({
			url: url + token,
			json: message
		}, function(error, response, body){
			res.send(body);
		});
	} else {
		res.send('Only events from production!');
	}
});