
var BarView = require('./BarView'), //BarView object encapsulates rendering info for bar on the front-end.
    BallView = require('./BallView'), //BallView object encapsulates rendering info for the ball on the front-end.
    GameView = require('./GameView'), //GameView object encapsulates rendering info for the game generally, including the layout on the front-end.
    eventControllers = require('./eventControllers'); //manages key events and launches 

 //TODO figure out a way to load the game from socket into this JS file.

var socket = io.connect('http://192.168.1.3:8000');

var game;

socket.on('load', function(a_game) {
	console.log(a_game);
	game = a_game;

var container = d3.select('#main');

var game_view = new GameView(game, container, window.innerWidth * 0.8, window.innerHeight * 0.8),
    ball_view = new BallView(game.ball, container, 'ball'),
    player_view = new BarView(game.playerOneBar, container, 'player'),
    opponent_view = new BarView(game.playerTwoBar, container, '#opponent');


game_view.renderGameView();
player_view.renderBarView();
opponent_view.renderBarView();
ball_view.renderBallView();
eventControllers(player_view);
});
