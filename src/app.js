
var BarView = require('./BarView'), //this is the constructor for the bar.
    BallView = require('./BallView'),
GameView = require('./GameView'), //draws the game screen.
eventControllers = require('./eventControllers'); //manages key events and launches 

 //TODO figure out a way to load the game from socket into this JS file.

var socket = io.connect('http://localhost:8000');

var game;

socket.on('load', function(a_game) {
	console.log(a_game);
	game = a_game;

var container = d3.select('#main');

var game_view = new GameView(game, container, 500, 500),
    ball_view = new BallView(game.ball, container, '#ball'),
    player_view = new BarView(game.playerOneBar, container, '#player'),
    opponent_view = new BarView(game.playerTwoBar, container, '#opponent');


game_view.renderGameView();
player_view.renderBarView();
opponent_view.renderBarView();
ball_view.renderBallView();
});
