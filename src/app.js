var bar = require('./bar'),
gameScreen = require('./playScreen'),
keyControllers = require('./moveControllers');

gameScreen(); //render the bare-bones game screen

bar('#main').render_function(); //render the player's bar

keyControllers();

