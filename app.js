//    Dependencies
var express = require('express');
var logfmt = require('logfmt');
var exec = require('child_process').exec;
var fs = require('fs');

var util = require('./util');

//    Setup
var API_PREFIX = '/api/v1';
var PORT = Number(process.env.PORT || 5000);
var app = express();
app.use(logfmt.requestLogger());
app.use(express.bodyParser({limit: '50mb'}));

//    Routes
app.post(API_PREFIX + '/recognize', function(req, res) {
    fs.writeFileSync('/tmp/test.png', new Buffer(req.body.imageData, 'base64'));
    exec('tesseract /tmp/test.png stdout', function(err, stdout, stderr) {
        console.log('err: ' + err + '\nstdout: ' + stdout + '\nstderr: ' + stderr);
        res.send(stdout);
        var wordBoxes = util.getWordBoxes(stdout);
        res.send(wordBoxes);
    });
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
