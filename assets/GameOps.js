var Game = require('./Game'),
    Bar = require('./Bar'),
    Point = require('./Point'),
    Ball = require('./Ball');

exports.initGame = function () {
       
	var ball_pos = new Point(0.5, 0.5),
	ball_velo = new Point(0, 0),
	pA_pos = new Point(0.4, 0.985),
	pA_velo = new Point(0.005, 0),
	pB_pos = new Point(0.4, 0.005),
	pB_velo = new Point(0.005, 0);

	var ball = new Ball(ball_pos, ball_velo, 0.01),
	pA = new Bar(pA_pos, pA_velo, 0.2, 0.01),
	pB = new Bar(pB_pos, pB_velo, 0.2, 0.01);

	var game = new Game(pA, pB, ball);

	return game;
}	
