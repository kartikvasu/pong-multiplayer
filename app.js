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

var allOurClients = {}, //storage of clients that we send to front-end
    allGames = [],  //storage of all games
    socketClients = {}; //storage of all socket clients (socket objects)

socket.sockets.on('connection', function (client) {

    console.log(Object.keys(allOurClients).length);
    //generate a new unique id for this client
    client.userid = UUID();
    
    //add our client info to all our clients 
    allOurClients[client.userid] = { id: client.userid };
    
    //save the socket with which this client connected
    socketClients[client.userid] = client;

    //tell the client that it is connected and give it unique id info
    client.emit('onconnected', { id: client.userid, clients: allOurClients } );

    //tell all front-end clients of the new connection
    socket.sockets.emit('newConnection', { id: client.userid });

    if(Object.keys(allOurClients).length === 2) {
        
        var clients = [], i = 0;

        for(var id in socketClients) {
            clients[i] = socketClients[id];
            i++;
        }

        var game = new gameOps(clients[0], clients[1]);
        socket.emit('load', game.initGame());
        game.runGame();

    }

    //what happens when this client disconnects
    client.on('disconnect', function () {

        //tell the front end
        socket.sockets.emit('disconnectedClient', { id: client.userid });

        //update our storage of clients
        delete socketClients[client.userid];
        delete allOurClients[client.userid];

    });

})

// socket.on('connection', function(socket) {
	// var game = new gameOps(socket);
	// socket.emit('load', game.initGame());
    // game.runGame();
// });
