var express = require('express');
var logfmt = require('logfmt');
var app = express();

app.use(logfmt.requestLogger());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 9000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});