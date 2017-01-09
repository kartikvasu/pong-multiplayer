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

var gameOps = function(clientA, clientB) {

	this.clientA = clientA;
	this.clientB = clientB;

	this.playerAmoveInterval = null;
	this.playerBmoveInterval = null;
	this.ballmoveInterval = null;

	this.ball = null;
	this.playerA = null;
	this.playerB = null;
	this.Game = null;

	this.initGame = function () {

		// initial positions and velocities of everything
		var ballPosition = new Point(0.5, 0.5),
		ballVelocity = new Point(0, .00025),
		playerAPosition = new Point(0.4, 0.985),
		playerAVelocity = new Point(0.0005, 0),
		playerBPosition = new Point(0.4, 0.005),
		playerBVelocity = new Point(0.0005, 0);
		
		this.ball = new Ball(ballPosition, ballVelocity, 0.01),
		this.playerA = new Bar(playerAPosition, playerAVelocity, 0.2, 0.01),
		this.playerB = new Bar(playerBPosition, playerBVelocity, 0.2, 0.01);

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
			that.clientA.emit('moveBall', that.ball.position);
			that.clientB.emit('moveBall', that.ball.position);
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

		clientA = that.clientA;
		clientB = that.clientB;

		/* stuff to be done when a key is pressed. */
		var move = function(playerID, direction) {

			for(var ID in intervals)
				clearInterval(intervals[ID]);
			
			intervals[playerID] = setInterval(function() {
				players[playerID].moveBar(direction);
				clientA.emit('move' + playerID, players[playerID].position);
				clientB.emit('move' + playerID, players[playerID].position);
			}, 1);

		}

		/* stuff to be done when a key is no longer being pressed. */
		var stop = function(playerID) {
			for (var ID in intervals) 
				clearInterval(intervals[ID]);
		}

		clientA.on('pressRight', function(playerID) {		
			move(playerID, 'right');
		});

		clientA.on('pressLeft', function(playerID) {
			move(playerID, 'left');
		});

		clientA.on('keyup', stop);

		clientB.on('pressRight', function(playerID) {		
			move(playerID, 'right');
		});

		clientB.on('pressLeft', function(playerID) {
			move(playerID, 'left');
		});

		clientB.on('keyup', stop);
	}

	return this;
			
}

module.exports = gameOps;

