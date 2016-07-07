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

app.use(express.static(__dirname));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

server.listen(port, function (err) {

	if(!err) console.log('Listening on: ' + port);

});


socket.on('connection', function(socket) {
	var ball_pos = new Point(0.5, 0.5),
	ball_velo = new Point(0, 0),
	pA_pos = new Point(0.4, 0.985),
	pA_velo = new Point(0.005, 0),
	pB_pos = new Point(0.4, 0.005),
	pB_velo = new Point(0.005, 0);

	var ball = new Ball(ball_pos, ball_velo, 0.01),
	pA = new Bar(pA_pos, pA_velo, 0.2, 0.01),
	pB = new Bar(pB_pos, pB_velo, 0.2, 0.01);

	var game = new Game(pA, pB, ball);

	socket.emit('load', game);
});
