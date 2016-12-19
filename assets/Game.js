function Game (playerOneBar, playerTwoBar, ball) {

	//typechecks for input
	if (arguments.length !== 3) {
		console.error("Input to Game constructor must have three variables.");
	}

	this.playerOneBar = playerOneBar;
	this.playerTwoBar = playerTwoBar;
	this.ball = ball;
}

module.exports = Game;
