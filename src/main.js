
    
var //BarView object encapsulates rendering info for bar on the front-end.
    BarView = require('./views/BarView'),
    //BallView object encapsulates rendering info for the ball on the front-end.
    BallView = require('./views/BallView'), 
    //GameView object encapsulates rendering info for the game generally, including the layout on the front-end.
    GameView = require('./views/GameView'), 
    //manages key events and launches 
    ubarController = require('./controllers/ubarController'); 


 //TODO figure out a way to load the game from socket into this JS file.

var socket = io.connect('http://localhost:8000/');

var game;

socket.on('load', function(a_game) {
	console.log(a_game);
	game = a_game;

var container = d3.select('#main');

var game_view = new GameView(game, container, window.innerWidth * 0.8, window.innerHeight * 0.8),
    ball_view = new BallView(game.ball, container, 'ball'),
    player_view = new BarView(game.playerOneBar, container, 'player'),
    opponent_view = new BarView(game.playerTwoBar, container, 'opponent');


/* Initialize views in position in the beginning. */
game_view.renderGameView();
player_view.renderBarView();
opponent_view.renderBarView();
ball_view.renderBallView();

/* Register controllers with the views. */
var player_controller = new ubarController(player_view);
player_controller.keyListen();


});
