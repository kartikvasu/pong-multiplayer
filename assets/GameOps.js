/*
This gameOps manages most of the "running" game on the backend.
More specifically the following are the things it does:
	- export an initGame function that helps initialize the views
	- make the ball move around on the backend and alert the main.js 
	script

*/
var Game = require('./Game'),
    Bar = require('./Bar'),
    Point = require('./Point'),
    Ball = require('./Ball');

var gameOps = function(socket) {

	this.socket = socket;

	this.ballPosition = new Point(0.5, 0.5);
	this.ballVelocity = new Point(.00025, .00025);
	this.playerAPosition = new Point(0.4, 0.985);
	this.playerAVelocity = new Point(0.0005, 0);
	this.playerBPosition = new Point(0.4, 0.005);
	this.playerBVelocity = new Point(0.0005, 0);

	this.playerAmoveInterval = null;
	this.playerBmoveInterval = null;
	this.ballmoveInterval = null;

	this.ball = null;
	this.playerA = null;
	this.playerB = null;
	this.Game = null;

	this.initGame = function () {
		
		this.ball = new Ball(this.ballPosition, this.ballVelocity, 0.01),
		this.playerA = new Bar(this.playerAPosition, this.playerAVelocity, 0.2, 0.01),
		this.playerB = new Bar(this.playerBPosition, this.playerBVelocity, 0.2, 0.01);

		this.game = new Game(this.playerA, this.playerB, this.ball);

		return this.game;
	}

	/*
	This is responsible for running the game on the back-end
	and creating and sending all the in-game socket events to 
	the front-end.
	*/
	this.runGame = function () {
	
		BarManager(this);
		BallManager(this);
	
	}

	/* 
	This function manages the ball movement functionality
	*/
	var BallManager = function(that) {
		clearInterval(that.ballmoveInterval);

		that.ballmoveInterval = setInterval(function() {
			that.ball.moveBall(that.playerA, that.playerB);
			socket.emit('moveBall', that.ball.position);
		}, 1);
		
	}

	/* 
	This function manages all of the socket functionality of 
	bars of *both* players. 
	*/
	var BarManager = function(that) {
		var players = {
			'A': that.playerA,
			'B': that.playerB
		},
		
		intervals = {
			'A': that.playerAmoveInterval,
			'B': that.playerBmoveInterval
		},

		socket = that.socket;

		/* stuff to be done when a key is pressed. */
		var move = function(playerID, direction) {

			for(var ID in intervals)
				clearInterval(intervals[ID]);
			
			intervals[playerID] = setInterval(function() {
				players[playerID].moveBar(direction);
				socket.emit('move' + playerID, players[playerID].position);
			}, 1);

		}

		/* stuff to be done when a key is no longer being pressed. */
		var stop = function(playerID) {
			for (var ID in intervals) 
				clearInterval(intervals[ID]);
		}

		socket.on('pressRight', function(playerID) {		
			move(playerID, 'right');
		});

		socket.on('pressLeft', function(playerID) {
			move(playerID, 'left');
		});

		socket.on('keyup', stop);
	}

	return this;
			
}

module.exports = gameOps;

