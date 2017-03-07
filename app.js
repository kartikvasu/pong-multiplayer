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

/*
Our storage:
allOurClients = 
{
    <userID>: {
        id: ...
    }, 

    <userID>: {
        id: ...
    }
}

allGames: {

}

socketClients: {
    <client-user-id>: socket-object,
    ...
}

*/
var allOurClients = {}, //storage of clients that we send to front-end, we will also be sending this to the front-end
                        // so that clients can choose their opponents.
    allGames = [],  //storage of all games
    socketClients = {}; //storage of all socket clients (socket objects)

socket.sockets.on('connection', function (client) {
    //generate a new unique id for this client
    client.userid = UUID();
    
    //add our client info to all our clients 
    allOurClients[client.userid] = { id: client.userid };
    //save the socket with which this client connected
    socketClients[client.userid] = client;

    console.log(Object.keys(allOurClients).length); //print out how many clients are connected

    //tell the client that it is connected and give it unique id info
    client.emit('onConnected', client.userid );

    //tell all front-end clients of the new connection
    socket.sockets.emit('newConnection', allOurClients);

    //this is when we start a game
    if(Object.keys(allOurClients).length === 2) {
        
        var clients = [], i = 0;

        for(var id in socketClients) {
            clients[i] = socketClients[id];
            i++;
        }

        var game = new gameOps(clients[0], clients[1]);
        var g = game.initGame();
        clients[0].emit('startGame', g);
        clients[1].emit('startGame', g);
        game.runGame();

    }
})
//what happens when this client disconnects
socket.sockets.on('disconnect', function () {

    //tell the front end
    socket.sockets.emit('disconnectedClient', allOurClients);

    //update our storage of clients
    delete socketClients[client.userid];
    delete allOurClients[client.userid];

});
 
