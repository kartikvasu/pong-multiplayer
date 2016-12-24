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

var gameOps = function() {

	this.ballPosition = new Point(0.5, 0.5);
	this.ballVelocity = new Point(.00025, .00025);
	this.playerAPosition = new Point(0.4, 0.985);
	this.playerAVelocity = new Point(0.0005, 0);
	this.playerBPosition = new Point(0.4, 0.05);
	this.playerBVelocity = new Point(0.0005, 0);

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
		
	}

	return this;
			
}

module.exports = gameOps;

