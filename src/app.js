var bar = require('./bar'),
gameScreen = require('./playScreen'),
keyControllers = require('./moveControllers');

gameScreen(); //render the bare-bones game screen

var playerBar = new bar();
playerBar.renderBar('#main', true);
console.log(playerBar);

keyControllers();

