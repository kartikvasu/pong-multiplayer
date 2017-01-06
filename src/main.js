var //BarView object encapsulates rendering info for bar on the front-end.
    BarView = require('./views/BarView'),
    //BallView object encapsulates rendering info for the ball on the front-end.
    BallView = require('./views/BallView'), 
    //GameView object encapsulates rendering info for the game generally, including the layout on the front-end.
    GameView = require('./views/GameView'), 
    //controllers
    ubarController = require('./controllers/ubarController'), 
    ballController = require('./controllers/ballController')


var socket = io.connect('192.168.1.8:8000/');

var game;

socket.on('onconnected', function( data ) {
    console.log('Connected successfully to the server, my ID is: ' + data.id + '\n');
    for(var i = 0; i < data.clients.length; i++) {
        if(data.clients[i] !== data.id)
            d3.select('#selectPlayers').append('div').attr("id", "u" + data.clients[i]).html(data.clients[i]);
    }
})

socket.on('newconnection', function( data ) {
    d3.select('#selectPlayers').append('div').attr("id", "u" + data).html(data);
})

socket.on('disconnectedclient', function( data ) {
    d3.select('#' + "u" + String(data)).remove();
})

socket.on('load', function(a_game) {
	console.log(a_game);
	game = a_game;

var container = d3.select('#main');

/* Initialize all the views. */
var game_view = new GameView(game, container, window.innerHeight * 0.8, window.innerHeight * 0.8),
    ball_view = new BallView(game.ball, container, 'ball'),
    player_view = new BarView(game.playerOneBar, container, 'player'),
    opponent_view = new BarView(game.playerTwoBar, container, 'opponent');


/* Initialize views in position in the beginning. */
game_view.renderGameView();
player_view.renderBarView();
opponent_view.renderBarView();
ball_view.renderBallView();

/* Initialize all the controllers. */
var player_controller = new ubarController(player_view, 'A', socket);
player_controller.keyListen();
player_controller.socketEventListeners();
ball_controller = new ballController(ball_view, socket);
ball_controller.socketEventListeners();

});
