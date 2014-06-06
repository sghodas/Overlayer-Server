//    Dependencies
var express = require('express');
var logfmt = require('logfmt');
var exec = require('child_process').exec;

//    Setup
var PORT = Number(process.env.PORT || 5000);
var app = express();
app.use(logfmt.requestLogger());

var child = exec('pwd', function(err, stdout, stderr) {
    console.log('stdout: ' + stdout);
});

//    Routes
app.get('/', function(req, res) {
    res.send('Hello, world!');
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
