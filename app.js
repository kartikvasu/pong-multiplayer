var express = require('express'),
    http = require('http'),
    port = process.argv[2] || 8000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

http.createServer(app).listen(port, function (err) {
	if(!err) console.log('Listening on port ' + port);
});
	
