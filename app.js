var express = require('express');
var logfmt = require('logfmt');

var PORT = Number(process.env.PORT || 5000);

var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
    res.send('Hello, world!');
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
