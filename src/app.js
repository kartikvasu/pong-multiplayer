var bar = require('./bar'), //this is the constructor for the bar.
gameScreen = require('./playScreen'), //draws the game screen.
keyControllers = require('./moveControllers'); //manages key events and launches 

gameScreen(); //render the bare-bones game screen

var playerBar = new bar(); //initialize the player bar object.

playerBar.renderBar('#main', true); //give it a selection and boolean indicating whether it's a player bar.

console.log(playerBar);

keyControllers(playerBar); //call the key controller function to listen for key events. 

