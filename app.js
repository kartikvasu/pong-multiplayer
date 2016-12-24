var express = require('express'),
    http = require('http'),
    port = process.argv[2] || 8000,
    io = require('socket.io'),
    gameOps = require('./assets/GameOps');

var app = express();
var server = http.createServer(app);
var socket = io.listen(server);

app.use(express.static(__dirname));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

server.listen(port, function (err) {
	if(!err) console.log('Listening on: ' + port);
});


socket.on('connection', function(socket) {
	
	var game = new gameOps(socket);
	socket.emit('load', game.initGame());
    game.runGame();

});
