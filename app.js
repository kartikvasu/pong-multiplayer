var express = require('express'),
    http = require('http'),
    port = process.argv[2] || 8000,
    UUID = require('node-uuid'),
    io = require('socket.io'),
    gameOps = require('./assets/GameOps');

var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

server.listen(port, function (err) {

	if(!err) console.log('Listening on: ' + port);

});

//real-time component with socket stuff
var socket = io.listen(server);

var allClientIDs = [], allGames = [], allClients = {};

socket.sockets.on('connection', function (client) {

    client.userid = UUID();
    
    allClientIDs.push(client.userid);

    allClients[client.userid] = client;

    client.emit('onconnected', { id: client.userid, clients: allClientIDs } );

    //tell all front-end clients of the new connection
    socket.sockets.emit('newconnection', client.userid);

    //what happens when this client disconnects
    client.on('disconnect', function () {

        //update our storage of clients
        allClients[client.userid] = null;
        var removeIndex = allClientIDs.indexOf(client.userid);
        allClientIDs.splice(removeIndex, 1);

        //tell the front end
        socket.sockets.emit('disconnectedclient', client.userid);
    });

})

// socket.on('connection', function(socket) {
	
// 	var game = new gameOps(socket);
// 	socket.emit('load', game.initGame());
//     game.runGame();

// });
