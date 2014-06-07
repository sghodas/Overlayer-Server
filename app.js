//    Dependencies
var express = require('express');
var logfmt = require('logfmt');
var exec = require('child_process').exec;
var fs = require('fs');

//    Setup
var API_PREFIX = '/api/v1';
var PORT = Number(process.env.PORT || 5000);
var app = express();
app.use(logfmt.requestLogger());
app.use(express.bodyParser());

//    Routes
app.post(API_PREFIX + '/recognize', function(req, res) {
    console.log(req.body);
    fs.writeFileSync('test.png', new Buffer(req.body.imageData, 'base64'));
    exec('tesseract test.png test hocr', function(err, stdout, stderr) {
        console.log('stdout: ' + stdout + '\nstderr: ' + stderr + '\nerr: ' + err);
        res.send(fs.readFileSync(__dirname + '/test.hocr', 'utf8'));
    });
});

app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
