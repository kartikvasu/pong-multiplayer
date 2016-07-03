var bar = require('./Bar'), //this is the constructor for the bar.
    ball = require('./Ball'),
gameScreen = require('./playScreen'), //draws the game screen.
keyControllers = require('./moveControllers'); //manages key events and launches 

gameScreen(); //render the bare-bones game screen

var playerBar = new bar(), //initialize the player bar object.
    ball = new ball();

playerBar.renderBar('#main', true); //give it a selection and boolean indicating whether it's a player bar.

ball.renderBall('#main');

setInterval(function() {
	ball.moveBall();
}, 1);

keyControllers(playerBar); //call the key controller function to listen for key events. 

