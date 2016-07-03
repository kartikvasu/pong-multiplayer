var express = require('express'),
    http = require('http'),
    port = process.argv[2] || 8000,
    io = require('socket.io'),
    Bar = require('./assets/Bar'),
    Point = require('./assets/Point'),
    Ball = require('./assets/Ball'),
    Game = require('./assets/Game');

var app = express();
var server = http.createServer(app);
var socket = io.listen(server);

console.log(Bar);
Bar();

app.use(express.static(__dirname));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

server.listen(port, function (err) {

	if(!err) console.log('Listening on: ' + port);

});
	
